import { context } from "$live/live.ts";
import BlockHero from "deco-sites/start/components/ui/Ethos/BlockHero.tsx";
import Gallery from "deco-sites/start/components/ui/People/Gallery.tsx";

export interface Props {
  enableInspectVSCode?: boolean;
}

export default function Ethos({ enableInspectVSCode }: Props) {
  return (
    <main>
      {enableInspectVSCode && !context.deploymentId && (
        <>
          <BlockHero firstText="" image="" textAlternative="" />
          <Gallery personInfo={[]} />
        </>
      )}
    </main>
  );
}
