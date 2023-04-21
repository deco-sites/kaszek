import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import CityPlate from "deco-sites/start/components/Main/CityPlate.tsx";
import { useState } from "preact/hooks";

export interface Props {
  img: LiveImage;
  city?: Cities[];
  title: string;
  first_description: string;
  second_description?: string;
}

export type Cities = {
  city: string;
  bottom: string;
  left: string;
};

export default function AboutKaszek(props: Props) {
  const [locations] = useState(Array.isArray(props.city) ? props.city : []);

  return (
    <section class="w-full flex items-center flex-col bg-[#ebf0ef] px-[12px] md:px-0">
      <div class="w-full l-container grid grid-rows-1 md:grid-cols-2 gap-4">
        <div class="h-full relative max-w-[509.99px]">
           <Image class="max-h-[620.99px] object-cover pointer-events-none" src={props.img} alt={"background"} width={509.99} height={620.99}/>
          {locations.map((city, index) => (
            <CityPlate
            key={index}
            name={city.city ? city.city : ""} 
            bottom={city.bottom}
            left={city.left}
          />        
          ))}      
        </div>
        <div class="w-full md:max-w-[384px] flex-center-center flex-col mx-auto">
          <h2
            class="mb-[20px] text-[24px] leading-[30px] tracking-[-.5px] Maax-Bold-Font"
          >
            {props.title}
          </h2>
          <p class="text-[16px] leading-[1.5] mb-[16px] Maax-Regular-Font">
            {props.first_description}
          </p>
          <p class="text-[16px] leading-[1.5] Maax-Regular-Font">
            {props.second_description}
          </p>
        </div>
      </div>
    </section>
  );
}
