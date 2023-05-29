import { useState } from "preact/hooks";

export interface Props {
  contents: Contents[];
}

export type SocialMedia = {
  social_media_name?: string;
  social_media_link?: string;
};

export type Contents = {
  first_text?: string;
  email_name?: string;
  email_link?: string;
  second_text?: string;
  social_media?: SocialMedia[];
  copyright?: string;
};

export default function Footer(props: Props) {
  const [socialMediaLinks] = useState(
    Array.isArray(props.contents[0].social_media)
      ? props.contents[0].social_media
      : [],
  );
  const currentYear = new Date().getFullYear();

  return (
    <footer class="bg-[#ebf0ef]  bottom-0 relative pt-[100px] pb-[50px] border-b-4 border-solid border-[#83ff97]">
      <div class="w-full max-w-[1200px] mx-auto xl:px-0 px-[12px]">
        <div class="grid lg:grid-cols-3 grid-rows-1 lg:gap-[24px] lg:gap-y-0 gap-x-[24px] gap-y-[60px] lg:mb-[150px] mb-[120px] md:grid-cols-2 grid-cols-1">
          <div>
            <p class="text-[16px] Maax-Regular-Font font-normal break-words hyphens-auto">
              {props.contents[0]?.first_text}
            </p>
            <a
              href={props.contents[0]?.email_link}
              class="text-[#005046] uppercase text-[14px] tracking-[1px] Maax-Bold-Font font-bold leading-[16px]"
            >
              {props.contents[0]?.email_name}
            </a>
          </div>
          <div>
            <p class="text-[16px] Maax-Regular-Font font-normal break-words hyphens-auto">
              {props.contents[0]?.second_text}
            </p>
          </div>
          <div>
            <ul class="flex items-center flex-start flex-wrap items-center justify-start lg:justify-end gap-x-[30px]">
              {socialMediaLinks.map((media: SocialMedia, index: number) => (
                <li key={index}>
                  <a
                    target="_blank"
                    rel="noopener"
                    href={media.social_media_link}
                    class="arrow-icon text-[#005046] uppercase text-[14px] tracking-[1px] Maax-Bold-Font font-bold"
                  >
                    {media.social_media_name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div class="text-[16px] Maax-Regular-Font font-normal">
          © {currentYear} {props.contents[0]?.copyright}
        </div>
      </div>
    </footer>
  );
}
