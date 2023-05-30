import { useCallback, useEffect, useState } from "preact/hooks";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import ButtonHamburger from "deco-sites/start/components/ui/Header/ButtonHamburger.tsx";
import useEventListener from "deco-sites/start/components/ui/Header/useEventListener.ts";

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
    "pt-0 pb-0 border-b-0 text-[36px] Noe-Display-Font font-bold tracking-[-0.5px] leading-[3rem]",
  menuClosed:
    "pt-[4px] pb-[2px] border-b-2 text-[14px] Maax-Bold-Font font-bold tracking-[1px] leading-[3rem]",
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

  const elementClass = hasScrolled &&
      !window.location.href.includes("ethos") &&
      !window.location.href.includes("companies") &&
      !window.location.href.includes("people") &&
      !window.location.href.includes("get-in-touch")
    ? ""
    : "is-sticky" as const;

  const headerClass = hasScrolled &&
      !window.location.href.includes("ethos") &&
      !window.location.href.includes("companies") &&
      !window.location.href.includes("people") &&
      !window.location.href.includes("get-in-touch")
    ? "bg-white transition duration-300 ease-in"
    : "bg-transparent transition duration-300 ease-in";

  const menuItemStyles = showMenu
    ? navlinkStyles.menuOpen
    : navlinkStyles.menuClosed;

  const addStickyClass = () => {
    const currentUrl = window.location.href;
    const liElements: NodeListOf<HTMLLIElement> = document.querySelectorAll(
      "header li",
    );
    const aLinks: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(
      "header li a",
    );

    aLinks.forEach((link) => {
      link.classList.remove("border-green-lemon-2px");
    });

    liElements.forEach((li) => {
      if (
        !showMenu && window.innerWidth > 768 &&
        li.classList.contains("is-sticky")
      ) {
        li.classList.remove("is-sticky");
      }
    });

    liElements.forEach((li) => {
      const link = li.querySelector("a");
      if (link) {
        const url = link.getAttribute("href");
        if (
          url && currentUrl.includes(url) && !showMenu &&
          window.innerWidth > 768
        ) {
          link.classList.add("border-green-lemon-2px");
        } else {
          link.classList.remove("border-green-lemon-2px");
        }
      }
    });
  };

  useEffect(() => {
    if (
      !window.location.href.includes("ethos") &&
      !window.location.href.includes("companies") &&
      !window.location.href.includes("people") &&
      !window.location.href.includes("get-in-touch")
    ) {
      return;
    }

    const targetNode = document.getElementsByClassName("l-header")[0];
    const aLink = document.querySelector("a");

    const checkAndRemoveStickyClass = () => {
      if (
        aLink &&
        !aLink.classList.contains("first_main") &&
        aLink.classList.contains("is-sticky")
      ) {
        aLink.classList.remove("is-sticky");
      }
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          checkAndRemoveStickyClass();
        }
      });
    };

    const intersectionObserver = new IntersectionObserver(observerCallback);
    intersectionObserver.observe(targetNode);

    const mutationObserverCallback = () => {
      checkAndRemoveStickyClass();
    };

    const mutationObserver = new MutationObserver(mutationObserverCallback);
    mutationObserver.observe(targetNode, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    if (targetNode.classList.contains("bg-transparent")) {
      targetNode.classList.remove(
        "bg-transparent",
        "transition",
        "duration-300",
        "ease-in",
      );
      targetNode.classList.add("bg-white");
    }

    addEventListener("load", addStickyClass);
    addEventListener("resize", addStickyClass);

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <header
      class={`l-header w-full flex items-center z-20 fixed top-0 ${headerClass}`}
    >
      <div
        class={`mx-auto w-full xl:pr-[0px] pr-[12px] xl:max-w-[1200px] sm:w-[calc(100% - 24px)]`}
      >
        <nav class="flex items-center justify-between w-full h-[80px]">
          <a
            href={props.link_logo}
            class={`z-10 xl:pl-[0px] pl-[12px] ${elementClass} ${
              showMenu ? "color-green-lemon pl-[12px]" : ""
            }`}
          >
            <Image
              src={props.logo}
              alt="logo"
              width={109.94}
              height={17.95}
            />
          </a>
          <div class="flex items-center justify-end w-full absolute md:relative">
            <ButtonHamburger showMenu={showMenu} toggleMenu={toggleMenu} />
            <ul
              class={`flex flex-col md:flex-row ${
                showMenu
                  ? "bg-[#005046] w-full fixed h-screen bottom-0 flex items-center justify-center"
                  : "hidden uppercase gap-[30px]"
              } md:flex`}
            >
              {linksList.map((props) => (
                <li
                  class={`border-transparent ${menuItemStyles} ${elementClass} ${
                    showMenu
                      ? "hover:color-green-lemon active:color-green-lemon"
                      : ""
                  } `}
                >
                  <a href={props.link} class="text-[#005046] leading-4">
                    {props.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
