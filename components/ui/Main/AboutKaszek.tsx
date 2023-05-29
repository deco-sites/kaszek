import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import CityPlate from "deco-sites/start/components/ui/Main/CityPlate.tsx";
import { useState } from "preact/hooks";

export interface Props {
  img: LiveImage;
  city?: Cities[];
  title: string;
  firstDescription: string;
  secondDescription?: string;
}

export type Cities = {
  label: string;
  bottom: string;
  left: string;
};

export default function AboutKaszek(props: Props) {
  const [locations] = useState(Array.isArray(props.city) ? props.city : []);

  return (
    <section class="w-full flex items-center flex-col bg-[#ebf0ef] px-[12px] lg:px-0">
      <div class="w-full max-w-[1200px] sm:w-[calc(100% - 24px)] grid grid-rows-1 md:grid-cols-2 gap-4">
        <div class="h-full relative max-w-[509.99px]">
          <Image
            class="max-h-[620.99px] object-cover pointer-events-none"
            src={props.img}
            alt={"background"}
            width={509.99}
            height={620.99}
          />
          {locations.map((city, index) => (
            <CityPlate
              key={index}
              label={city.label ? city.label : ""}
              bottom={city.bottom}
              left={city.left}
            />
          ))}
        </div>
        <div class="w-full md:max-w-[360.09px] lg:max-w-[384px] flex items-center justify-center flex-col mx-auto">
          <h2 class="mb-[20px] text-[24px] leading-[30px] tracking-[-.5px] Maax-Bold-Font font-bold">
            {props.title}
          </h2>
          <p class="text-[16px] leading-[1.5] mb-[16px] Maax-Regular-Font font-normal">
            {props.firstDescription}
          </p>
          <p class="text-[16px] leading-[1.5] Maax-Regular-Font font-normal">
            {props.secondDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
