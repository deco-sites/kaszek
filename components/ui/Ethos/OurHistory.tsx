import { useState } from "preact/hooks";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

export type Text = {
  paragraphs?: string[];
};

export type Props = {
  image: LiveImage;
  textAlternative: string;
  label: string;
  text: Array<Text>;
};

export default function OurHistory(props: Props) {
  const [textList] = useState<Array<Text>>(
    Array.isArray(props.text) ? props.text : [],
  );

  return (
    <div class="mx-auto xl:max-w-[1200px] xl:px-0 px-[15px] w-full lg:mt-[120px] md:mt-[75px] mt-[50px] grid grid-cols-1 gap-4">
      <div class="w-full">
        <div class="col-span-2 mb-[126px]">
          <figure>
            <Image
              class="w-full h-full object-cover"
              src={props.image}
              alt={props.textAlternative}
              width={1400}
              height={934}
            />
          </figure>
        </div>
        {textList.map((text, index) => (
          <div class="grid md:grid-cols-2 grid-cols-1 gap-8">
            <div>
              <h3 class="mb-[20px] md:text-[76px] text-[36px] md:leading-[76px] text-[36px] text-[#005046] Noe-Display-Font tracking-[-0.5px]">
                {props.label}
              </h3>
            </div>
            <div key={index} class="mt-[16px]">
              {text.paragraphs?.map((paragraph, index) => (
                <p
                  class="Maax-Regular-Font text-black text-[16px] mb-[16px]"
                  key={index}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
