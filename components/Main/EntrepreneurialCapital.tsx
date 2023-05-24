import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import Weather from "deco-sites/start/components/Main/Weather.tsx";

export type Props = {
  title: string;
  background: LiveImage;
  location?: string;
  latitude?: number;
  longitude?: number;
};


export default function EntrepreneurialCapital(props: Props) {
  return (
    <section class="h-screen relative first_main">
      <Image
        class="w-full h-full object-cover z-0 absolute"
        src={props.background}
        alt={"background"}
        width={1920}
        height={1080}
      />
      <span class="w-full h-screen absolute top-0 left-0 bg-gradient-to-b from-transparent to-black opacity-50">
      </span>
      <div class="w-full h-screen flex-center-between flex-col relative">
        <h1
          class="text-white text-center text-[40px] z-5 inherit leading-none py-[80px] my-auto  xl:(text-[120px] l-container) md:(text-[90px]) Noe-Display-Font"style="white-space: pre-line;">
          {props.title}
        </h1>
        <div
          class="w-full flex-center-between xl:px-[0px] px-[12px] bottom-[40px] absolute w-full mx-auto xl:(l-container) Maax-Bold-Font">
          <p class="text-[#83ff97] uppercase tracking-wider text-[12px] md:text-[14px]">
            {props.location}
          </p>
          <div class="flex-center-between">
            <Weather latitude={props.latitude} longitude={props.longitude} />
          </div>
        </div>
      </div>
    </section>
  );
}
