import { context } from "$live/live.ts";
import Category from "deco-sites/start/components/ui/Companies/Category.tsx";
import BannerCarousel from "deco-sites/start/components/ui/Companies/BannerCarousel.tsx";

export interface Props {
  enableInspectVSCode?: boolean;
}

export default function Companies({ enableInspectVSCode }: Props) {
  return (
    <main>
      {enableInspectVSCode && !context.deploymentId && (
        <>
          <Category
            firstText=""
            secondText=""
            paragraph=""
            logos={[]}
          />
          <BannerCarousel />
        </>
      )}
    </main>
  );
}
