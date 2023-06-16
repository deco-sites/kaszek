import { useState } from "preact/hooks";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

export type Person = {
  photo: LiveImage;
  textAlternative: string;
  label: string;
  profession: string;
};

export type Props = {
  personInfo: Array<Person>;
};

export default function Gallery(props: Props) {
  const [peopleList] = useState<Array<Person>>(
    Array.isArray(props.personInfo) ? props.personInfo : [],
  );
  return (
    <div class="max-w-[1200px] w-full mx-auto lg:mt-[120px] md:mt-[75px] mt-[50px] mb-[75px] xl:px-0 px-[15px]">
      <div class="w-full grid gap-x-[24px] gap-y-[80px] grid-cols-1 mobile:grid-cols-2 lg:grid-cols-three">
        {peopleList.map((person, index) => (
          <div key={index} class="mx-auto">
            {person.photo && (
              <>
                <Image
                  class="block w-full pointer-events-none pt-[10px] border-t-[1px] border-[#83ff97] mb-[24px]"
                  src={person.photo}
                  alt={person.textAlternative}
                  width={388}
                  height={485}
                />
                <p class="text-[#005046] Maax-Bold-Font text-[24px] leading-[30px] tracking-[-0.5px]">
                  {person.label}
                </p>
                <p class="text-[#005046] Maax-Bold-Font md:text-[14px] md:leading-[14px] text-[12px] leading-[12px] tracking-[1px] mt-[7px]">
                  {person.profession}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
