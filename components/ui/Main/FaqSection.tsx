import { asset } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";

export interface Props {
  titleSection: string;
  faqs: Faq[];
}

export interface Faq {
  question: string;
  /** @format textarea */
  answer: string;
  /** @format textarea */
  answerTwo?: string;
  /** @format textarea */
  answerThree?: string;
  isOpen?: boolean;
}

export default function FaqSection(props: Props) {
  const [faqs, setFaqs] = useState(props.faqs);

  const toggleAccordion = (index: number) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq, i) => {
        if (i === index) {
          return { ...faq, isOpen: !faq.isOpen };
        } else {
          return { ...faq, isOpen: false };
        }
      })
    );
  };

  return (
    <section class="w-full mx-auto pt-[50px] md:pt-[75px] lg:pt-[120px] pb-[75px] max-w-[1200px] xl:px-0 px-[15px]">
      <div style={{ WebkitTapHighlightColor: "transparent" }}>
        <h3 class="md:text-[76px] text-[36px] text-[#005046] leading-[1] tracking-[-.5px] w-full h-[79.19px] md:h-[152px] inline-flex items-end uppercase Noe-Display-Font font-bold">
          {props.titleSection}
        </h3>
        <div class="grid grid-cols-1 mt-[50px] md:mt-[120px]">
          {faqs.map((faq, index) => (
            <>
              <div
                class={`flex justify-between items-center cursor-pointer py-[36px] ${
                  faq.isOpen ? "" : "border-green-lemon"
                }`}
                onClick={() => toggleAccordion(index)}
              >
                <h4 class="text-[24px] text-[#005046] pr-[40px] Maax-Bold-Font font-bold">
                  {faq.question}
                </h4>
                <span class="transform transition-transform duration-300">
                  <object
                    data={asset(`/arrow-accordion.svg`)}
                    aria-label="accordion menu toggle"
                    width="34"
                    height="34"
                    class={`transform pointer-events-none ${
                      faq.isOpen ? "rotate-180" : ""
                    }`}
                  >
                  </object>
                </span>
              </div>
              {faq.isOpen && (
                <div class="border-b-1 border-solid border-[#83ff97] pb-[36px]">
                  <p class="text-[16px] max-w-[486px] Maax-Regular-Font font-normal">
                    {faq.answer}
                  </p>
                  {faq.answerTwo && (
                    <p
                      class={`text-[16px] max-w-[486px] Maax-Regular-Font font-normal ${
                        faq.answerThree ? "mb-4 mt-4" : "mt-4"
                      }`}
                    >
                      {faq.answerTwo}
                    </p>
                  )}
                  {faq.answerThree && (
                    <p class="text-[16px] max-w-[486px] Maax-Regular-Font font-normal">
                      {faq.answerThree}
                    </p>
                  )}
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
