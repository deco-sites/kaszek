import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import Weather from "deco-sites/start/components/ui/Main/Weather.tsx";

export type Props = {
  firstText: string;
  secondText?: string;
  image: LiveImage;
  width: number;
  height?: number;
  textAlternative: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  gapTemperatureAndIcon?: "gap-0" | "gap-[8px]";
};

export default function BlockHero(props: Props) {
  return (
    <div class="relative flex flex-col items-center">
      <div class="bg-white z-10 w-full flex justify-center mt-[80px]">
        <div class="max-w-[1200px] sm:w-[calc(100% - 24px)] w-full md:pt-20 md:pb-20 pt-[30px] pb-[40px]">
          <h1 class="Noe-Display-Font font-bold text-[#005046] tracking-[-0.5px] md:w-calc md:mr-0 md:ml-0 w-calc mr-3 ml-3 mb-[20px] md:text-[76px] text-[36px] md:leading-[76px] leading-[39.6px] xl:pl-[0px] sm:pl-[12px]">
            {props.firstText}
            <br />
            {props.secondText}
          </h1>
        </div>
      </div>
      <div class="h-full md:max-h-[520px] min-h-[265px] overflow-hidden contents after:bg-gradient-to-b after:from-transparent after:to-black after:block after:w-full after:h-[120px] after:left-0 after:bottom-0 after:content-[''] after:opacity-50 z-20 absolute after:absolute">
        <Image
          class="w-full object-cover md:max-h-[520px] min-h-[265px] z-0 inset-0"
          src={props.image}
          alt={props.textAlternative}
          width={props.width}
          height={props.height}
          loading={"eager"}
        />
      </div>
      <div class="w-full flex items-center justify-between xl:px-[0px] px-[12px] bottom-[40px] mx-auto xl:max-w-[1200px] sm:w-[calc(100% - 24px)] Maax-Bold-Font font-bold absolute z-10">
        <p class="text-[#83ff97] uppercase text-[12px] md:text-[14px] font-bold tracking-[1px]">
          {props.location}
        </p>
        <div class="flex items-center justify-between">
          <Weather
            latitude={props.latitude}
            longitude={props.longitude}
            gapTemperatureAndIcon={props.gapTemperatureAndIcon}
          />
        </div>
      </div>
    </div>
  );
}
