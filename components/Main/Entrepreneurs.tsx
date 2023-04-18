import { useEffect, useRef, useState } from "preact/hooks";

export default function Entrepreneurs() {
  const [entrepreneurs, setEntrepreneurs] = useState(0);
  const [ventures, setVentures] = useState(0);
  const [funds, setFunds] = useState(0);

  const ref = useRef(null);

  useEffect(() => {
    const options = {
      rootMargin: "0px",
      threshold: 0.5,
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const increaseNumber = (
          finalValue: number,
          setStateFunction: (value: number) => void,
        ) => {
          let startValue = 0;
          const timerId = setInterval(() => {
            startValue++;
            setStateFunction(startValue);
            if (startValue === finalValue) {
              clearInterval(timerId);
            }
          }, 10);
        };

        increaseNumber(275, setEntrepreneurs);
        increaseNumber(114, setVentures);
        increaseNumber(7, setFunds);
        observer.unobserve(entry.target);
      }
    }, options);
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      class={`w-full px-4 py-8 bg-[#ebf0ef] flex justify-center`}
    >
      <div class="w-full max-w-[1200px] sm:grid md:grid-cols-3 gap-4 items-center grid-cols-1">
        <div class="text-center color-green">
          <h2
            class="text-2xl font-bold mb-8"
            style="font-family: 'Maax Bold', sans-serif;"
          >
            Entrepreneurs
          </h2>
          <p
            class="text-[76px] font-bold mb-5"
            style="font-family: 'Noe Display Bold', sans-serif;"
          >
            {entrepreneurs}
          </p>
        </div>
        <div class="text-center color-green">
          <h2
            class="text-2xl font-bold mb-8"
            style="font-family: 'Maax Bold', sans-serif;"
          >
            Ventures
          </h2>
          <p
            class="text-[76px] font-bold mb-5"
            style="font-family: 'Noe Display Bold', sans-serif;"
          >
            {ventures}
          </p>
        </div>
        <div class="text-center color-green">
          <h2
            class="text-2xl font-bold mb-8"
            style="font-family: 'Maax Bold', sans-serif;"
          >
            Funds
          </h2>
          <p
            class="text-[76px] font-bold mb-5"
            style="font-family: 'Noe Display Bold', sans-serif;"
          >
            {funds}
          </p>
        </div>
      </div>
    </section>
  );
}
