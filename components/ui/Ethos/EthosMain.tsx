import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import Weather from "deco-sites/start/components/ui/Main/Weather.tsx";

export type Props = {
  first_text: string;
  second_text?: string;
  background: LiveImage;
  location?: string;
  latitude?: number;
  longitude?: number;
};

export default function EthosMain(props: Props) {
  return (
    <main class="flex items-center justify-between flex-col relative top-20">
      <div class="bg-white z-10 w-full flex justify-center">
        <div class="max-w-[1200px] sm:w-[calc(100% - 24px)] w-full md:pt-20 md:pb-20 pt-[30px] pb-[40px]">
          <h1 class="Noe-Display-Font font-bold text-[#005046] tracking-[-.5px] md:mb-0 md:w-calc md:mr-0 md:ml-0 w-calc mr-3 ml-3 mb-[20px] md:text-[76px] text-[36px] leading-none xl:pl-[0px] pl-[12px]">
            {props.first_text}
            <br />
            {props.second_text}
          </h1>
        </div>
      </div>
      <div class="h-full max-h-[265px] overflow-hidden contents">
        <Image
          class="w-full h-screen object-cover md:max-h-[578px] z-0 inset-0"
          src={props.background}
          alt={"background"}
          width={1920}
          height={1080}
        />
      </div>
      <div class="w-full flex items-center justify-between xl:px-[0px] px-[12px] bottom-[120px] w-full mx-auto xl:max-w-[1200px] sm:w-[calc(100% - 24px)] Maax-Bold-Font font-bold relative z-10">
        <p class="text-[#83ff97] uppercase tracking-wider text-[12px] md:text-[14px] font-bold">
          {props.location}
        </p>
        <div class="flex items-center justify-between">
          <Weather latitude={props.latitude} longitude={props.longitude} />
        </div>
      </div>
    </main>
  );
}
