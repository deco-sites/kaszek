import { asset } from "$fresh/runtime.ts";
import { forwardRef } from "preact/compat";
import { useLayoutEffect, useState } from "preact/hooks";

interface Props {
  src?: string;
  className?: string;
  link?: string;
  width?: string | number;
  height?: string | number;
}

const Logo = forwardRef<HTMLAnchorElement, Props>(
  ({ src, className = "", width = "", height = "", link}, ref) => {
    const [hasScrolled, setHasScrolled] = useState(false);

    useLayoutEffect(() => {
      const handleScroll = () => setHasScrolled(globalThis.scrollY > 0);

      globalThis.addEventListener("scroll", handleScroll);
      return () => globalThis.removeEventListener("scroll", handleScroll);
    }, []);

    const elementClass = hasScrolled ? "" : "is-sticky" as const;
    const altText = src ? src.split("/").pop()?.split(".")[0] || "Imagem" : undefined;

    return (
      <a href={link} className={`${className} ${elementClass} `} ref={ref}>
        {src && <object data={asset(src)} type="image/svg+xml" width={width} height={height} aria-label={altText} class="pointer-events-none"/>}
      </a>
    );
  }
);

export default Logo;

