import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

export type Props = {
  first_text: string;
  second_text?: string;
  background: LiveImage;
};

export default function EthosMain(props: Props) {
  return (
    <main class="min-h-screen flex-center-between flex-col relative top-20">
      <div class="bg-white z-10 w-full l-container">
        <h1 class="Noe-Display-Font color-green tracking-[-.5px]  pt-20 pb-20 text-[76px] leading-none">
          {props.first_text}<br />{props.second_text}
        </h1>
      </div>
      <div class="max-h-[520px] min-h-[265px] overflow-hidden">
        <Image
          class="w-full h-full object-cover z-0 relative object-bottom inset-0"
          src={props.background}
          alt={"background"}
          width={1920}
          height={1080}
        />
      </div>
    </main>
  );
}
