import { useState } from "preact/hooks";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export type Text = {
  subtitle: string;
  paragraphs?: string[];
};

export type Props = {
  label: string;
  srcMobile: LiveImage;
  srcDesktop?: LiveImage;
  textAlternative: string;
  text: Array<Text>;
};

export default function OurPhilosophy(props: Props) {
  const [textList] = useState<Array<Text>>(
    Array.isArray(props.text) ? props.text : [],
  );
  const validHTMLTags = /(<\/?br\s*\/?>)|^([^<>]*)$/i;

  return (
    <div class="flex flex-col md:flex-row w-full md:mt-[120px] mt-[50px] md:mb-[28px] md:mb-0 mx-auto xl:max-w-[1200px] xl:px-0 px-[15px] gap-8">
      <div class="w-full mobile:block flex justify-center">
        <Picture>
          <Source
            media="(max-width: 80px)"
            src={props.srcMobile}
            width={80}
            height={160}
          />
          <Source
            media="(min-width: 512px)"
            src={props.srcDesktop ? props.srcDesktop : props.srcMobile}
            width={512}
            height={1024}
          />
          <img
            class="mobile:w-[512px] w-[80px]"
            src={props.srcMobile}
            width={512}
            height={1024}
            alt={props.textAlternative}
            sizes="auto"
            decoding="async"
            loading="lazy"
          />
        </Picture>
      </div>
      <div class="w-full">
        <h2 class="text-[24px] md:mt-0 mt-[32px] Maax-Bold-Font text-[#005046] mobile:text-left text-center leading-[30px] tracking-[-0.5px]">
          {props.label}
        </h2>
        {textList.map((text, index) => (
          <div key={index} class="gap-y-[16px] flex flex-col">
            <h3
              class="md:mt-[75px] mt-[50px] mb-[4px] md:leading-[76px] leading-[39.6px] md:text-[76px] text-[36px] text-[#005046] Noe-Display-Font tracking-[-0.5px]"
              dangerouslySetInnerHTML={{
                __html: validHTMLTags.test(text.subtitle) ? text.subtitle : "",
              }}
            >
            </h3>
            {text.paragraphs?.map((paragraph, index) => (
              <p key={index} class="text-[16px] Maax-Regular-Font text-black leading-[24px]">
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
