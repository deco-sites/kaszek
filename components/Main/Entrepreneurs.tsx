import { useEffect, useRef, useState } from "preact/hooks";

export interface Props {
  result: Results[];
}

export type Results = {
  title: string;
  value: number;
};

export default function Entrepreneurs(props: Props) {
  const ref = useRef(null);
  const [resultsData, setResultsData] = useState<Array<Results>>(Array.isArray(props.result) ? props.result : []);

  useEffect(() => {
    const options = {
      rootMargin: "0px",
      threshold: 0.5,
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const increaseNumber = (
          finalValue: number,
          index: number,
        ) => {
          let startValue = 0;
          const timerId = setInterval(() => {
            startValue++;
            setResultsData((prevState) => {
              const newArray = [...prevState];
              newArray[index] = { ...newArray[index], value: startValue };
              return newArray;
            });
            if (startValue === finalValue) {
              clearInterval(timerId);
            }
          }, 10);
        };
        resultsData.forEach((data, index) => {
          increaseNumber(data.value, index);
        });
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} class={`w-full px-4 py-8 bg-[#ebf0ef] flex justify-center`}>
      <div class="w-full max-w-[1200px] sm:grid md:grid-cols-3 gap-4 items-center grid-cols-1">
        {resultsData.map((data, index) => (
          <div class="text-center color-green" key={index}>
            <h2 class="text-2xl mb-8 Maax-Bold-Font">{data.title}</h2>
            <p class="text-[76px] mb-5 Noe-Display-Font leading-none">{data.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
