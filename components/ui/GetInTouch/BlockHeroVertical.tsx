import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import Weather from "deco-sites/start/components/ui/Main/Weather.tsx";

export type Props = {
  image: LiveImage;
  width: number;
  height?: number;
  textAlternative: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  iconSize?: number;
  transform?:
    | "scale-[0]"
    | "scale-[0.8]"
    | "scale-[1]"
    | "scale-[2]"
    | "scale-[3]"
    | "scale-[4]";
  gapTemperatureAndIcon?: "gap-0" | "gap-[8px]";
  isMobileFlex?: "flex-row" | "flex-col";
};

export default function BlockHeroVertical(props: Props) {
  const scaleClasses = props.transform ? ` ${props.transform}` : "";
  return (
    <div class="relative flex flex-col items-center mt-[120px]">
      <div class="h-screen max-h-[1134px] overflow-hidden contents after:bg-gradient-to-b after:from-transparent after:to-black after:block after:w-full after:h-[120px] after:left-0 after:bottom-0 after:content-[''] after:opacity-50 z-20 absolute after:absolute">
        <Image
          class="w-full object-cover max-h-[1134px] h-screen z-0 inset-0"
          src={props.image}
          alt={props.textAlternative}
          width={props.width}
          height={props.height}
          loading={"eager"}
        />
      </div>
      <div class="w-full flex flex-col-reverse items-center justify-between xl:px-[0px] px-[12px] bottom-[40px] mx-auto xl:max-w-[1200px] sm:w-[calc(100% - 24px)] Maax-Bold-Font font-bold absolute z-10 top-[50%]">
        <p class="text-[#83ff97] uppercase text-[12px] md:text-[14px] font-bold tracking-[1px]">
          {props.location}
        </p>
        <div class={`flex items-center justify-between ${scaleClasses}`}>
          <Weather
            latitude={props.latitude}
            longitude={props.longitude}
            iconSize={props.iconSize}
            isMobileFlex={props.isMobileFlex}
            gapTemperatureAndIcon={props.gapTemperatureAndIcon}
          />
        </div>
      </div>
    </div>
  );
}
