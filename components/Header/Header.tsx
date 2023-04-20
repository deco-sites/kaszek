import { useCallback, useState } from "preact/hooks";
import NavLink from "deco-sites/start/components/Header/Navlink.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import ButtonHamburger from "deco-sites/start/components/Header/ButtonHamburger.tsx";
import useEventListener from "deco-sites/start/components/Header/useEventListener.ts";

export interface Props {
  logo: LiveImage;
  link_logo?: string;
  link: Links[];
}

export type Links = {
  link: string;
  title: string;
};

const navlinkStyles = {
  menuOpen:
    "pt-0 pb-0 border-b-0 text-[36px] Noe-Display-Font tracking-[-.5px] leading-[3rem]",
  menuClosed:
    "pt-[4px] pb-[2px] border-b-2 text-[14px] Maax-Bold-Font tracking-[-.5px] leading-[3rem]",
};

export default function Header(props: Props) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [linksList] = useState<Array<Links>>(
    Array.isArray(props.link) ? props.link : [],
  );

  const toggleMenu = useCallback(() => {
    setShowMenu((prev) => {
      if (!prev) {
        window.scrollTo(0, 0);
      }
      return !prev;
    });
  }, []);

  useEventListener("resize", () => {
    if (globalThis.innerWidth > 768) {
      setShowMenu(false);
    }
  });

  useEventListener("scroll", () => {
    setHasScrolled(globalThis.scrollY > 0);
  });

  useEventListener("click", () => {
    document.body.style.overflow = showMenu ? "hidden" : "";
  });

  const elementClass = hasScrolled ? "" : "is-sticky";

  const headerClass = hasScrolled
    ? "bg-white transition duration-300 ease-in"
    : "bg-transparent transition duration-300 ease-in";

  const menuItemStyles = showMenu
    ? navlinkStyles.menuOpen
    : navlinkStyles.menuClosed;

  return (
    <header
      class={`l-header w-full flex items-center z-10 relative fixed top-0 ${headerClass}`}
    >
      <div class={`mx-auto w-full xl:pr-[0px] pr-[12px] xl:(l-container)`}>
        <nav class="flex-center-between w-full h-[80px]">
          <a href={props.link_logo} className={`z-10 xl:pl-[0px] pl-[12px] ${elementClass} ${showMenu ? "color-green-lemon pl-[12px]" : ""}`}>
            <Image src={props.logo} alt="logo" width={109.94} height={17.95} />
          </a>
          <div class="flex-center-end w-full absolute md:(relative)">
            <ButtonHamburger showMenu={showMenu} toggleMenu={toggleMenu} />
            <ul
              class={`flex flex-col md:(flex-row) ${
                showMenu
                  ? "bg-[#005046] w-full fixed h-screen bottom-0 flex-center-center"
                  : "hidden uppercase gap-[30px]"
              } md:flex`}
            >
              {linksList.map((props) => (
                <NavLink
                  link={props.link}
                  title={props.title}
                  className={menuItemStyles}
                />
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
