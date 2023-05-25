import { useEffect, useRef, useState } from "preact/hooks";

interface CityPlateProps {
  name: string;
  bottom: string;
  left: string;
}

export default function CityPlate({ name, bottom, left }: CityPlateProps) {
  const [isDotClicked, setIsDotClicked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsDotClicked(false);
      }
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref]);

  const handleDotClick = (event: MouseEvent) => {
    event.stopPropagation();
    setIsDotClicked(!isDotClicked);
  };

  const plateStyles = {
    bottom: bottom,
    position: "absolute",
    left: left,
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      ref={ref}
      class={`relative w-[40px] h-[40px] rounded-full transition-all duration-500 cursor-pointer ${
        (isHovering || isDotClicked)
          ? "bg-[#83ff97] z-10"
          : "bg-[rgba(131,255,151,.2)] z-0"
      }`}
      style={plateStyles}
      onClick={isHovering ? undefined : handleDotClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        class={`z-0 w-[14px] h-[14px] rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer transition-all duration-500 ${
          (isHovering || isDotClicked)
            ? "bg-[#005046] pointer-events-none"
            : " bg-[#83ff97]"
        }`}
        onClick={handleDotClick}
      >
      </span>
      <div
        class={`pointer-events-none absolute left-[1.2rem] sm:left-1/2 flex justify-center  transition-all duration-500 ${
          (isHovering || isDotClicked)
            ? "visible opacity-100 mt-2 z-10"
            : "invisible opacity-0 mt-0 z-0"
        }`}
      >
        <span class="block bg-[#005046] top-[40px] absolute w-[20px] h-[20px] border-transparent border-solid border-b-10 border-l-10 border-r-10 border-t-0 border-green-600 transform rotate-45">
        </span>
        <span class="block bg-[#005046] top-[40px]  text-[#83ff97] text-[14px] Maax-Bold-Font font-bold px-[15px] py-2 uppercase leading-none absolute sm:left-1/2 transform sm:-translate-x-1/2 -translate-x-[25%] mt-1 whitespace-nowrap">
          {name}
        </span>
      </div>
    </div>
  );
}
