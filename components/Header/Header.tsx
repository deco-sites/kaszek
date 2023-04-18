import { useEffect, useLayoutEffect, useState } from "preact/hooks";
import NavLink from "deco-sites/start/components/Header/Navlink.tsx";
import ScrollClassRemover from "deco-sites/start/components/Header/ScrollClassRemover.tsx";
import ButtonHamburger from "deco-sites/start/components/Header/ButtonHamburger.tsx";

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useLayoutEffect(() => {
    const handleScroll = () => setHasScrolled(globalThis.scrollY > 0);
    globalThis.addEventListener("scroll", handleScroll);

    return () => globalThis.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (globalThis.innerWidth > 768) {
        setShowMenu(false);
      }
    };

    globalThis.addEventListener("resize", handleResize);
    return () => globalThis.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showMenu]);

  const headerClass = hasScrolled
    ? "bg-white transition duration-300 ease-in"
    : "bg-transparent transition duration-300 ease-in";

  const menuItemStyles = showMenu
    ? "mr-0 pt-0 pb-0 border-b-0 text-[36px] Noe-Display-Font tracking-[-.5px] leading-[3rem]"
    : "mr-[30px] pt-[4px] pb-[2px] border-b-2 text-[14px] Maax-Bold-Font tracking-[-.5px] leading-[3rem]";

  return (
    <header
      class={`l-header w-full flex items-center z-10 relative fixed top-0 ${headerClass}`}
    >
      <div class={`mx-auto w-full xl:pr-[0px] pr-[12px] xl:(l-container)`}>
        <nav class="flex-center-between w-full h-[80px]">
          <ScrollClassRemover
            as="a"
            href="https://deco-sites-kaszek.deno.dev/"
            src="/imgs/logo.svg"
            className={`z-10 xl:pl-[0px] pl-[12px] ${
              showMenu ? "color-green-lemon pl-[12px]" : ""
            }`}
            width="auto"
            height={17.95}
          />
          <div class="flex-center-end w-full absolute md:(relative)">
            <ButtonHamburger
              showMenu={showMenu}
              toggleMenu={() => {
                setShowMenu((prev) => {
                  if (!prev) window.scrollTo(0, 0);
                  return !prev;
                });
              }}
            />
            <ul
              class={`flex flex-col md:(flex-row)  ${
                showMenu
                  ? "bg-[#005046] w-full fixed h-screen bottom-0 flex-center-center"
                  : "hidden uppercase"
              } md:flex`}
            >
              <NavLink href="/" content="Ethos" className={menuItemStyles} />
              <NavLink
                href="/"
                content="Companies"
                className={menuItemStyles}
              />
              <NavLink href="/" content="People" className={menuItemStyles} />
              <NavLink
                href="/"
                content="Get in touch"
                className={`${menuItemStyles} mr-0`}
              />
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
