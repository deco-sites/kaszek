import { useEffect, useRef, useState } from "preact/hooks";
import { JSX } from "preact";

export interface TimeZone {
  offset: number;
  countries: string[];
}

export interface Props {
  timeZone: TimeZone[];
}

export default function Clocks(props: Props) {
  const [time, setTime] = useState(new Date());
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  // const [sliderItems, setSliderItems] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    addEventListener("resize", handleResize);

    return () => {
      clearInterval(timer);
      removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const sliderElement = sliderRef.current;
    if (sliderElement) {
      sliderElement.addEventListener("mousedown", handleDragStart);
      sliderElement.addEventListener("mousemove", handleDrag);
      sliderElement.addEventListener("mouseup", handleDragEnd);
      sliderElement.addEventListener("mouseleave", handleDragEnd);
      sliderElement.addEventListener("touchstart", handleDragStart);
      sliderElement.addEventListener("touchmove", handleDrag);
      sliderElement.addEventListener("touchend", handleDragEnd);
    }

    return () => {
      if (sliderElement) {
        sliderElement.removeEventListener("mousedown", handleDragStart);
        sliderElement.removeEventListener("mousemove", handleDrag);
        sliderElement.removeEventListener("mouseup", handleDragEnd);
        sliderElement.removeEventListener("mouseleave", handleDragEnd);
        sliderElement.removeEventListener("touchstart", handleDragStart);
        sliderElement.removeEventListener("touchmove", handleDrag);
        sliderElement.removeEventListener("touchend", handleDragEnd);
      }
    };
  }, []);

  const handleDragStart = (event: MouseEvent | TouchEvent) => {
    const sliderElement = sliderRef.current;
    if (sliderElement) {
      isDraggingRef.current = true;
      dragStartXRef.current = event instanceof MouseEvent
        ? event.pageX
        : event.touches[0].pageX;
      dragStartScrollLeftRef.current = sliderElement.scrollLeft;
      sliderElement.style.cursor = "default";
    }
  };

  const handleDrag = (event: MouseEvent | TouchEvent) => {
    if (!isDraggingRef.current) return;

    const sliderElement = sliderRef.current;
    if (sliderElement) {
      const currentX = event instanceof MouseEvent
        ? event.pageX
        : event.touches[0].pageX;
      const deltaX = currentX - dragStartXRef.current;
      sliderElement.scrollLeft = dragStartScrollLeftRef.current - deltaX;
    }
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false;
    const sliderElement = sliderRef.current;
    if (sliderElement) {
      sliderElement.style.cursor = "default";
      const sliderWidth = sliderElement.offsetWidth;
      const maxScrollLeft = sliderElement.scrollWidth - sliderWidth;
      const scrollLeft = sliderElement.scrollLeft;

      if (scrollLeft < maxScrollLeft) {
        centerSlider();
      }
    }
  };

  const centerSlider = () => {
    const sliderElement = sliderRef.current;
    if (sliderElement) {
      const sliderWidth = sliderElement.offsetWidth;
      const scrollLeft = sliderElement.scrollLeft;
      const centerIndex = Math.round(scrollLeft / sliderWidth);
      scrollToSlider(centerIndex);
    }
  };

  const getTimeForCountry = (offset: number): string => {
    const utc = time.getTime() + time.getTimezoneOffset() * 60000;
    const localTime = new Date(utc + offset * 3600000);
    const hours = localTime.getHours().toString().padStart(2, "0");
    const minutes = localTime.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const getRotationStyle = (offset: number, type: string): string => {
    const utc = time.getTime() + time.getTimezoneOffset() * 60000;
    const localTime = new Date(utc + offset * 3600000);
    const rotationMinutes = (localTime.getMinutes() / 60) * 360;
    let rotationHours = ((localTime.getHours() % 12) * 30) +
      ((localTime.getMinutes() / 60) * 30);

    if (type === "hours") {
      if (localTime.getHours() === 12) {
        rotationHours = 0;
      }
      if (localTime.getHours() !== 11 && localTime.getHours() !== 12) {
        rotationHours += 3;
      }

      return `rotate(${rotationHours}deg) translate(50%, 100%) translateX(-5px) translateY(-150%)`;
    } else if (type === "minutes") {
      return `rotate(${rotationMinutes}deg) translate(50%, 100%) translateX(-5px) translateY(-150%)`;
    }

    return "";
  };

  const renderSliders = () => {
    let slidesPerView;
    if (screenSize >= 1200) {
      slidesPerView = 4;
    } else if (screenSize >= 960) {
      slidesPerView = 3;
    } else if (screenSize >= 640) {
      slidesPerView = 2;
    } else {
      slidesPerView = 1;
    }

    const sliderStyles = {
      display: "flex",
      overflowX: "scroll",
      overflowY: "hidden",
      flexWrap: "nowrap",
      scrollSnapType: "x mandatory",
      scrollBehavior: "smooth",
      scrollPadding: `0 calc((100% - ${slidesPerView} * 280px) / 2)`,
      cursor: "default",
    };

    const sliderItemStyles = {
      flex: `0 0 calc((100% - ${slidesPerView - 1} * 15px) / ${slidesPerView})`,
    };

    const sliderItems = props.timeZone?.map((
      countries: TimeZone,
      index: number,
    ) => (
      <div key={index} style={sliderItemStyles}>
        <div className="flex justify-center flex-col">
          <div className="w-[280px] h-[280px] relative bg-[#ebf0ef] rounded-full flex flex-col justify-center items-center mx-auto">
            <div
              className="h-[45px] w-[10px] absolute bg-[#005046] z-10"
              style={{ transform: getRotationStyle(countries.offset, "hours") }}
            >
            </div>
            <div
              className="h-[84px] w-[10px] absolute bg-[#83ff97]"
              style={{
                transform: getRotationStyle(countries.offset, "minutes"),
              }}
            >
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-[24px] text-center text-[#005046] font-bold mt-[32px] mb-[20px]">
              {getTimeForCountry(countries.offset)}
            </div>
            {countries.countries.map((name: string, index: number) => (
              <div
                className="text-[14px] text-[#005046] text-center font-bold leading-[14px]"
                key={index}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    ));
    // setSliderItems(sliderItems);
    return (
      <div
        style={sliderStyles}
        ref={sliderRef}
        className="clock-scroll lg:gap-[15px]"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        {sliderItems}
      </div>
    );
  };

  const renderDots = () => {
    const dotComponents = [];
    const activeDotIndex = Math.round(
      (sliderRef.current?.scrollLeft || 0) /
        (sliderRef.current?.offsetWidth || 1),
    );

    let dotsCount;

    if (screenSize >= 1200) {
      dotsCount = 0;
    } else if (screenSize >= 960) {
      dotsCount = 2;
    } else if (screenSize >= 640) {
      dotsCount = 3;
    } else {
      dotsCount = 4;
    }
    // if (sliderItems?.length < 1) {
    //   return null;
    // }
    for (let i = 0; i < dotsCount; i++) {
      dotComponents.push(
        <button
          className={`h-3 w-3 rounded-full mx-1 ${
            i === activeDotIndex ? "bg-[#005046]" : "bg-[#83ff97]"
          }`}
          key={i}
          onClick={() => scrollToSlider(i)}
        >
        </button>,
      );
    }

    return dotComponents;
  };

  const scrollToSlider = (index: number) => {
    const sliderElement = sliderRef.current;
    if (sliderElement) {
      const sliderWidth = sliderElement.offsetWidth;
      const scrollAmount = index * sliderWidth;
      sliderElement.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col xl:px-[0px] px-[12px]">
      <div className="w-full max-w-[1200px] lg:mt-[120px] md:mt-[75px] mt-[50px] mb-[75px] mx-auto Maax-Bold-Font overflow-x-auto overflow-y-hidden">
        {renderSliders()}
        <div className="flex justify-center mt-4 w-full max-w-[1200px] mx-auto">
          {renderDots()}
        </div>
      </div>
    </div>
  );
}
