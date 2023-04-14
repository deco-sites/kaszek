import ScrollClassRemover from "deco-sites/start/islands/ScrollClassRemover.tsx";
import { forwardRef } from "preact/compat";

interface Props {
  href: string;
  content: string;
  className?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, Props>(
  ({ href, content, className = "" }) => {
    return (
      <li className={`border-transparent ${className}`}>
        <ScrollClassRemover
          as="a"
          href={href}
          content={content}
          className="color-green font-bold leading-4 letter-spacing"
        />
      </li>
    );
  }
);

export default NavLink;
