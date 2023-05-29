import { context } from "$live/live.ts";
import BlockHero from "deco-sites/start/components/ui/Ethos/BlockHero.tsx";
import OurPhilosophy from "deco-sites/start/components/ui/Ethos/OurPhilosophy.tsx";
import OurHistory from "deco-sites/start/components/ui/Ethos/OurHistory.tsx";
import InvestmentStages from "deco-sites/start/components/ui/Ethos/InvestmentStages.tsx";
import Blockquote from "deco-sites/start/components/ui/Ethos/Blockquote.tsx";

export interface Props {
  enableInspectVSCode?: boolean;
}

export default function Ethos({ enableInspectVSCode }: Props) {
  return (
    <main>
      {enableInspectVSCode && !context.deploymentId && (
        <>
          <BlockHero firstText="" image="" textAlternative="" />
          <OurPhilosophy label="" srcMobile="" textAlternative="" text={[]} />
          <OurHistory image="" textAlternative="" label="" text={[]} />
          <InvestmentStages text={[]} />
          <Blockquote
            quoteIconTop=""
            quoteIconBottom=""
            textAlternativeTop=""
            textAlternativeBottom=""
          />
        </>
      )}
    </main>
  );
}
