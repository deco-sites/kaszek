import { asset } from "$fresh/runtime.ts";

export default function EntrepreneurialCapital() {
  return (
    <section
      style={{
        backgroundImage: `url(/imgs/david-geere-2-touched.jpeg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "calc(100vw - (100vw - 100%))",
      }}
    >
      <span class="w-full h-screen absolute top-0 left-0 bg-gradient-to-b from-transparent to-black opacity-50">
      </span>
      <div class="w-full h-screen flex-center-between flex-col relative">
        <h1
          class="text-white text-center text-[40px] z-5 inherit leading-none py-[80px] my-auto  xl:(text-[120px] l-container) md:(text-[90px])"
          style="white-space: pre-line; font-family: 'Noe Display Bold', sans-serif;"
        >
          Entrepreneurial capital
        </h1>
        <div
          class="w-full flex-center-between xl:px-[0px] px-[12px] bottom-[40px] absolute w-full mx-auto xl:(l-container)"
          style="font-family: 'Maax Bold', sans-serif;"
        >
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
    </section>
  );
}
