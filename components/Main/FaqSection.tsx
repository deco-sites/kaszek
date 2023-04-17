import { asset } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";

export default function FaqSection() {
  const [faqs, setFaqs] = useState([
    {
      question: "What industries do we invest in?",
      answer:
        "Our core is technology: We are big believers in the fabulous impact that new technologies can have over humankind. Therefore, we invest in any industry where technology and innovation, in any form, offer a chance of significant disruption and value creation.",
      answertwo:
        "So far, we have invested in industries such as financial services, education, healthcare, ecommerce, marketplaces, enterprise software, and SaaS, among others.",
      isOpen: false,
    },
    {
      question: "What stages do we get involved at?",
      answer:
        "In our early-stage funds, we write our first checks in seed, series A, or series B rounds.  Sometimes we partner with entrepreneurs when they just have a promising idea; other times we join them a little later in their journeys.  And, in all cases, we expect to support them throughout several rounds.",
      answertwo: "In our opportunity funds, we invest from series C rounds all the way to pre-IPO financing.",
      isOpen: false,
    },
    {
      question: "What is our geographic focus?",
      answer: "We mostly invest in companies that target Latin America as their main initial market.",
      answertwo: "We strongly believe in the enormous opportunity that the technology ecosystem presents in the region, and in our capacity to add significant value across Latin America, since it is an ecosystem we have been involved with for more than 20 years as entrepreneurs, mentors, and investors.",
      isOpen: false,
    },
    {
      question: "What characteristics do we look for in entrepreneurs?",
      answer: "We look forward to partnering with visionary and inspirational founders, who are honest, determined, and purpose driven.",
      answertwo:
      "Entrepreneurs that know with clarity not only what they want to accomplish, but also why they want to do it.  That always see the glass half-full, relentlessly search for the light at the end of the tunnel, and challenge all boundaries to bend reality and change the world.",
      answerthree: "At a more personal level, we love founders that are strong leaders AND great team players, with product-oriented mindsets, and who dare to embrace the unknown.",
      isOpen: false,
    },
  ]);

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
    <section class="w-full pt-[50px] md:pt-[75px] lg:pt-[120px] pb-[75px] max-w-[1200px] xl:px-0 px-[15px]">
        <div style={{ WebkitTapHighlightColor: 'transparent' }}>
            <h3 class="md:text-[76px] text-[36px] font-bold color-green leading-[1] tracking-[-.5px] sm:h-[79.19px] md:h-[152px] inline-flex items-end" style="font-family: 'Noe Display Bold', sans-serif;">FAQ</h3>
            <div class="grid grid-cols-1 mt-[50px] md:mt-[120px]">
            {faqs.map((faq, index) => (
                    <>
                        <div class={`flex justify-between items-center cursor-pointer py-[36px] ${faq.isOpen ? '' : ' border-b-1 border-solid border-[#83ff97]'}`}
                            onClick={() => toggleAccordion(index)}>
                            <h4 class="text-[24px] font-bold color-green pr-[72px]" style="font-family: 'Maax Bold', sans-serif;">{faq.question}</h4>
                            <span class="transform transition-transform duration-300">
                            <object data={asset(`/imgs/arrow-accordion.svg`)} width="34" height="34" class={`transform pointer-events-none ${
                                faq.isOpen ? 'rotate-180' : ''
                            }`}> </object>
                            </span>
                        </div>
                        {faq.isOpen && (
                            <div class="border-b-1 border-solid border-[#83ff97] pb-[36px]">
                                <p class="text-[16px] max-w-[486px]">{faq.answer}</p>
                                    {faq.answertwo && (
                                        <p class={`text-[16px] max-w-[486px] ${faq.answerthree ? 'mb-4 mt-4' : 'mt-4'}`}>{faq.answertwo}</p>)}
                                    {faq.answerthree && <p class="text-[16px] max-w-[486px]">{faq.answerthree}</p>}
                            </div>
                        )}
                    </>
                ))}
                </div>
        </div>
    </section>
  );
}
