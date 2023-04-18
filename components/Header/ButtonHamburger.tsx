import { asset } from "$fresh/runtime.ts";

type ButtonHamburgerProps = {
  showMenu: boolean;
  toggleMenu: () => void;
};

export default function ButtonHamburger(props: ButtonHamburgerProps) {
  const { showMenu, toggleMenu } = props;

  return (
    <button
      onClick={toggleMenu}
      className={`block md:hidden z-10 relative focus:outline-none focus:border-none ${
        showMenu ? "w-[48px] h-[48px]" : "w-8 h-[13.99px] right-[12px]"
      }`}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <object
        data={asset(`/imgs/icon-x.svg`)}
        className={`block absolute bg-white top-0 rounded-full right-[16px]`}
        style={{
          width: "48px",
          height: "48px",
          pointerEvents: "none",
          display: `${showMenu ? "block" : "none"}`,
        }}
      />
      <span
        className={`${
          showMenu ? "" : " block absolute"
        } top-[1px] w-full h-[3px] rounded-md ${
          window.scrollY > 0 ? "bg-[#005046]" : "bg-white"
        } ${showMenu ? "opacity-0" : ""}`}
      />
      <span
        className={`${
          showMenu ? "" : " block absolute"
        } top-[80%] w-full h-[3px] rounded-md ${
          window.scrollY > 0 ? "bg-[#005046]" : "bg-white"
        } ${showMenu ? "-rotate-45" : ""}`}
      />
    </button>
  );
}
