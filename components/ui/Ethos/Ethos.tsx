import { context } from "$live/live.ts";
import EthosMain from "deco-sites/start/components/ui/Ethos/EthosMain.tsx";
import OurPhilosophy from "deco-sites/start/components/ui/Ethos/OurPhilosophy.tsx";
import OurHistory from "deco-sites/start/components/ui/Ethos/OurHistory.tsx";

export interface Props {
  enableInspectVSCode?: boolean;
}

export default function Ethos({ enableInspectVSCode }: Props) {
  return (
    <main>
      {enableInspectVSCode && !context.deploymentId && (
        <>
          <EthosMain first_text="" background="" />
          <OurPhilosophy label="" srcMobile="" textAlternative="" text={[]} />
          <OurHistory image="" textAlternative="" label="" text={[]} />
        </>
      )}
    </main>
  );
}
