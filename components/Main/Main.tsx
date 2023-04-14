import { asset } from "$fresh/runtime.ts";

export default function Main() {
  return (
    <main
      class="top-0 left-0 absolute z-0 flex-center-between flex-col"
      style={{
        backgroundImage: `url(/imgs/background.webp)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <span class="w-full h-screen absolute top-0 left-0 bg-gradient-to-b from-transparent to-black opacity-50">
      </span>
      <div class="w-full h-screen flex-center-between flex-col relative">
        <h1
          class="text-white text-center text-[40px] z-5 inherit leading-none py-[80px] my-auto  xl:(text-[120px] l-container) md:(text-[90px])"
          style="white-space: pre-line;"
        >
          Entrepreneurial capital
        </h1>
        <div class="w-full flex-center-between px-[12px] bottom-[40px] absolute w-full mx-auto xl:(l-container)">
          <p class="text-[#83ff97] font-bold uppercase tracking-wider text-[12px] md:text-[14px]">
            Amazon Rainforest, Brazil
          </p>
          <div class="flex-center-between">
            <object
              data={asset(`/imgs/icon-cloud.svg`)}
              width="23.99"
              height="23.99"
              class="mr-[8px]"
            >
            </object>
            <span class="text-[#83ff97] text-[12px] font-bold z-2 md:text-[14px]">
              23°C
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
