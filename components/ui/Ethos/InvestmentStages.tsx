import { useState } from "preact/hooks";

export type Text = {
  title?: string;
  label?: string;
};

export type Props = {
  text: Array<Text>;
};

export default function InvestmentStages(props: Props) {
  const [investmentList] = useState<Array<Text>>(
    Array.isArray(props.text) ? props.text : [],
  );

  return (
    <div className="mx-auto xl:max-w-[1200px] xl:px-0 px-[15px] w-full lg:mt-[120px] md:mt-[75px] mt-[50px]">
      <div className="w-full grid md:gap-[24px] gap-[75px] grid-cols-1 md:grid-cols-five">
        {investmentList.map((text, index) => (
          <div key={index} className="text-center">
            {text.title && (
              <p class="text-[#005046] Maax-Bold-Font md:mb-[32px] mb-[16px] text-[24px] leading-[30px] tracking-[-0.5px]">
                {text.title}
              </p>
            )}
            {text.label && (
              <p class="text-[#005046] Noe-Display-Font text-[76px] leading-[76px] tracking-[-0.5px] mb-[20px]">
                {text.label}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
