import { asset } from "$fresh/runtime.ts";
import { useEffect, useState } from "preact/hooks";

export type Props = {
  latitude?: number;
  longitude?: number;
  iconSize?: number;
  isMobileFlex?: "flex-row" | "flex-col";
  gapTemperatureAndIcon?: "gap-0" | "gap-[8px]";
};

const DEFAULT_WIDTH = 23.99;

async function fetchTemperature({ latitude, longitude, iconSize }: Props) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
  const response = await fetch(url);
  const json = await response.json();
  const { current_weather } = json;
  const { temperature, weathercode, is_day } = current_weather;
  return { temperature, weathercode, is_day, iconSize };
}

export default function Weather({
  latitude,
  longitude,
  iconSize,
  isMobileFlex,
  gapTemperatureAndIcon,
}: Props) {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [icon, setIcon] = useState<string>("rain");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getTemperature() {
      const { temperature, weathercode } = await fetchTemperature({
        latitude,
        longitude,
        iconSize,
      });
      setTemperature(temperature);
      if (temperature >= 0 && temperature <= 13) {
        setIcon("sun");
      } else if (temperature >= 14 && temperature <= 22) {
        setIcon("sunny-intervals");
      } else if (weathercode >= 23 && weathercode <= 48) {
        setIcon("cloud");
      } else {
        setIcon("rain");
      }
      setIsLoading(false);
    }
    getTemperature();
  }, [latitude, longitude, iconSize]);

  const defaultIconSize = iconSize || DEFAULT_WIDTH;

  const flexClasses = `flex ${
    isMobileFlex === "flex-row" ? "" : "md:flex-row"
  } ${isMobileFlex || ""} items-center ${
    gapTemperatureAndIcon ? `${gapTemperatureAndIcon}` : ""
  }`;

  return (
    <div class={flexClasses}>
      {!isLoading && icon === "cloud" && (
        <object
          data={asset(`/icon-cloud.svg`)}
          width={defaultIconSize.toString()}
          height={defaultIconSize.toString()}
          aria-label="icon cloud"
        />
      )}
      {!isLoading && icon === "rain" && (
        <object
          data={asset(`/icon-rain.svg`)}
          width={defaultIconSize.toString()}
          height={defaultIconSize.toString()}
          aria-label="icon rain"
        />
      )}
      {!isLoading && icon === "sun" && (
        <object
          data={asset(`/icon-sun.svg`)}
          width={defaultIconSize.toString()}
          height={defaultIconSize.toString()}
          aria-label="icon sun"
        />
      )}
      {!isLoading && icon === "sunny-intervals" && (
        <object
          data={asset(`/icon-sunny-intervals.svg`)}
          width={defaultIconSize.toString()}
          height={defaultIconSize.toString()}
          aria-label="icon sunny intervals"
        />
      )}
      {!isLoading && temperature !== null && (
        <span class="text-[#83ff97] text-[12px] z-2 md:text-[14px]">
          {Math.round(temperature)}°C
        </span>
      )}
    </div>
  );
}
