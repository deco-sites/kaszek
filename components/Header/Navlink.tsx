import { VNode } from 'preact';
import { useState, useEffect } from 'preact/hooks';

export interface Props {
  link: string;
  title: string;
  className?: string;
}

export default function Navlink({ link, title, className = '' }: Props): VNode {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(globalThis.scrollY > 0);

    globalThis.addEventListener("scroll", handleScroll);
    return () => globalThis.removeEventListener("scroll", handleScroll);
  }, []);

  const elementClass = hasScrolled ? "" : "is-sticky" as const;

  return (
    <li class={`border-transparent ${className} ${elementClass}`}>
      <a href={link} class="color-green leading-4">
        {title}
      </a>
    </li>
  );
}
