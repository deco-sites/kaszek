import Slider from "deco-sites/start/components/ui/Companies/Slider.tsx";
import SliderJS from "deco-sites/start/components/ui/Companies/SliderJS.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { useId } from "preact/hooks";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { asset } from "$fresh/runtime.ts";

export interface Banner {
  /** @description desktop otimized image */
  desktop: LiveImage;
  /** @description mobile otimized image */
  mobile: LiveImage;
  /** @description Image's alt text */
  alt: string;
  action?: {
    /** @description Image text quote */
    quote: string;
    /** @description Image text authorOfTheQuote */
    authorOfTheQuote: string;
    /** @description Title authorOfTheQuote */
    label: string;
  };
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @quote Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function BannerItem(
  { image, lcp }: { image: Banner; lcp?: boolean },
) {
  const {
    alt,
    mobile,
    desktop,
    action,
  } = image;

  return (
    <div class="relative overflow-y-hidden h-max grid grid-cols-1 md:grid-cols-2 gap-[24px]">
      <Picture preload={lcp} class="h-max">
        <Source
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile}
          class="block w-full"
          width={360}
        />
        <Source
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          class="block w-full"
          width={588}
        />
        <img
          class="block w-full"
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          width={588}
          alt={alt}
        />
      </Picture>
      {action && (
        <div class="top-0 bottom-0 m-auto left-0 right-0 w-full flex flex-col gap-4 lg:py-[60px] lg:px-[15%]">
          <blockquote class="lg:text-[56px] text-[36px] text-[#005046] text-center Noe-Display-Font grid grid-cols-1 justify-center xl:leading-[56px] leading-[39.6px]">
            <div class="relative col-span-2 pb-[40px]">
              <object
                data={asset(`/quote-top.svg`)}
                aria-label="quote icon"
                width="44"
                height="44"
                class="block w-[44px] h-[44px] pointer-events-none"
              />
            </div>
            {action.quote}
            <cite class="not-italic text-center col-span-2 xl:mt-[5rem] mt-[48px]">
              <p class="Maax-Bold-Font font-black text-[24px] leading-[31.2px]">
                {action.authorOfTheQuote}
              </p>
              <p class="Maax-Bold-Font font-black text-[14px] leading-[18.2px]">
                {action.label}
              </p>
            </cite>
            <div class="relative col-span-2 pt-[40px]">
              <object
                data={asset(`/quote-bottom.svg`)}
                aria-label="quote icon"
                width="44"
                height="44"
                class="block float-right w-[44px] h-[44px] pointer-events-none"
              />
            </div>
          </blockquote>
        </div>
      )}
    </div>
  );
}

function Dots({ images, interval = 0 }: Props) {
  return (
    <>
      <ul class="carousel justify-center col-span-full gap-4 z-10 row-start-4 mt-[32px]">
        {images?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div>
                <div
                  class={`w-[12px] h-[12px]`}
                  style={{ animationDuration: `${interval}s` }}
                />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

function BannerCarousel({ images, preload, interval }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      class="w-full max-w-[1200px] xl:mx-auto xl:px-0 px-[15px] lg:mt-[120px] md:mt-[75px] mt-[50px] mb-[75px]"
    >
      <Slider class="carousel carousel-center w-full col-span-full row-span-full scrollbar-none gap-6">
        {images?.map((image, index) => (
          <Slider.Item index={index} class="carousel-item w-full">
            <BannerItem image={image} lcp={index === 0 && preload} />
          </Slider.Item>
        ))}
      </Slider>

      <Dots images={images} interval={interval} />

      <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}

export default BannerCarousel;
