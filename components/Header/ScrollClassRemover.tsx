import { asset } from "$fresh/runtime.ts";
import { forwardRef } from "preact/compat";
import { useLayoutEffect, useState } from "preact/hooks";

import type { JSX } from "preact";

interface Props {
  as?: keyof JSX.IntrinsicElements;
  children?: JSX.Element;
  content?: string;
  src?: string;
  className?: string;
  href?: string;
  width?: string | number;
  height?: string | number;
}

const ScrollClassRemover = forwardRef<HTMLElement, Props>(
  ({ as = "div", children, content, src, className = "", width = "", height = "", ...props }, ref) => {
    const [hasScrolled, setHasScrolled] = useState(false);

    useLayoutEffect(() => {
      const handleScroll = () => setHasScrolled(globalThis.scrollY > 0);

      globalThis.addEventListener("scroll", handleScroll);
      return () => globalThis.removeEventListener("scroll", handleScroll);
    }, []);

    const elementClass = hasScrolled ? "" : "is-sticky" as const;
    const altText = src ? src.split("/").pop()?.split(".")[0] || "Imagem" : undefined;
    const Element: keyof JSX.IntrinsicElements = as;

    return (
      <Element {...props} className={`${className} ${elementClass} `}>
        {content && <>{content}</>}
        {src &&  <object data={asset(src)} type="image/svg+xml" width={width} height={height} aria-label={altText} class="pointer-events-none"/>}
        {children}
      </Element>
    );
  }
);

export default ScrollClassRemover;


