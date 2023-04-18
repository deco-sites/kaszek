import { asset } from "$fresh/runtime.ts";
import CityPlate from "deco-sites/start/components/Main/CityPlate.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";

export type Props = {
  hero: string;
  descr: string;
  team: string;
  background: LiveImage;
};

export default function AboutKaszek(props: Props) {
  return (
    <section class="w-full flex items-center flex-col bg-[#ebf0ef] px-[12px] md:px-0">
      <div class="w-full l-container grid grid-rows-1 md:grid-cols-2 gap-4">
        <div class="h-full relative max-w-[509.99px]">
          <object
            data={asset(`/imgs/america.svg`)}
            width="100%"
            class="max-h-[620.99px] object-cover pointer-events-none"
          />
          <CityPlate name="São Paulo" bottom="32%" left="74%" />
          <CityPlate name="Mexico DF" bottom="75%" left="18.5%" />
          <CityPlate name="Buenos Aires" bottom="21%" left="66%" />
          <CityPlate name="Curitiba" bottom="28%" left="73%" />
          <CityPlate name="Medellín" bottom="62%" left="49%" />
          <CityPlate name="Santiago" bottom="21%" left="54%" />
          <CityPlate name="Guadalajara" bottom="77%" left="15%" />
          <CityPlate name="Mendoza" bottom="22.5%" left="58.5%" />
          <CityPlate name="Miami" bottom="83.5%" left="40.5%" />
          <CityPlate name="Montevideo" bottom="21.2%" left="67.5%" />
          <CityPlate name="Porto Alegre" bottom="25.1%" left="72%" />
          <CityPlate name="Rio de Janeiro" bottom="31%" left="77%" />
          <CityPlate name="Uberlandia" bottom="35.5%" left="72%" />
          <CityPlate name="Sao Jose dos Campos" bottom="33.5%" left="74%" />
          <CityPlate name="Bogota" bottom="59.5%" left="52%" />
          <CityPlate name="Quito" bottom="56%" left="46%" />
          <CityPlate name="Lima" bottom="43%" left="50%" />
        </div>
        <Image
          class="rounded-[40px]"
          src={props.background}
          alt={"background"}
          width={190}
          height={265}
        />

        <div class="w-full md:max-w-[384px] flex-center-center flex-col mx-auto">
          <h2
            class="mb-[20px] text-[24px] leading-[30px] tracking-[-.5px] font-bold"
            style="font-family: 'Maax Bold', sans-serif;"
          >
            {props.hero}
          </h2>
          <p class="text-[16px] leading-[1.5] mb-[16px]">
            {props.descr}
          </p>
          <p class="text-[16px] leading-[1.5]">
            {props.team}
          </p>
        </div>
      </div>
    </section>
  );
}
