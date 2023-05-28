import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

export type Props = {
  label?: string;
  quoteIconTop: LiveImage;
  quoteIconBottom: LiveImage;
  textAlternativeTop: string;
  textAlternativeBottom: string;
};

export default function Blockquote(props: Props) {
  return (
    <div class="w-full bg-[#005046] px-[15px] lg:py-[50px] py-[35px] lg:mt-[120px] md:mt-[75px] mt-[50px]">
      <blockquote class="xl:max-w-[1200px] mx-auto grid grid-cols-2">
        <div class="relative lg:mb-[70px] mb-[34px] col-span-2">
          <Image
            class="block lg:w-[80px] w-[44px] lg:h-[80px] h-[44px] pointer-events-none"
            src={props.quoteIconTop}
            alt={props.textAlternativeTop}
            width={80}
            height={80}
          />
        </div>
        <p
          class={`text-[#83ff97] lg:text-[72px] text-[36px] Noe-Display-Font text-center lg:leading-[72px] leading-[39.6px] tracking-[-0.5px] col-span-2`}
        >
          {props.label}
        </p>
        <div class="relative lg:mt-[70px] mt-[34px] col-span-2">
          <Image
            class="block float-right lg:w-[80px] w-[44px] lg:h-[80px] h-[44px] pointer-events-none"
            src={props.quoteIconBottom}
            alt={props.textAlternativeBottom}
            width={80}
            height={80}
          />
        </div>
      </blockquote>
    </div>
  );
}
