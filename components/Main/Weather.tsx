import { asset } from "$fresh/runtime.ts";
import { useEffect, useState } from "preact/hooks";

export type Props = {
  latitude?: number;
  longitude?: number;
};

async function fetchTemperature({ latitude, longitude }: Props) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
  const response = await fetch(url);
  const json = await response.json();
  const { current_weather } = json;
  const { temperature, weathercode, is_day } = current_weather;
  return { temperature, weathercode, is_day };
}

export default function Weather({ latitude, longitude }: Props) {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [icon, setIcon] = useState<string>("rain");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getTemperature() {
      const { temperature, weathercode } = await fetchTemperature({
        latitude,
        longitude,
      });
      setTemperature(temperature);
      setIcon(weathercode > 45 ? "rain" : "cloud");
      setIsLoading(false);
    }
    getTemperature();
  }, [latitude, longitude]);

  return (
    <div class="flex items-center">
      {!isLoading && icon === "cloud" ? (
        <object
          data={asset(`/icon-cloud.svg`)}
          width="23.99"
          height="23.99"
          class="mr-[8px]"
          aria-label="icon cloud"
        ></object>
      ) : !isLoading && icon === "rain" ? (
        <object
          data={asset(`/icon-rain.svg`)}
          width="23.99"
          height="23.99"
          class="mr-[8px]"
          aria-label="icon rain"
        ></object>
      ) : null}
      {!isLoading && temperature !== null ? (
        <span class="text-[#83ff97] text-[12px] z-2 md:text-[14px]">
          {Math.round(temperature)} °C
        </span>
      ) : (
        null
      )}
    </div>
  );
}

