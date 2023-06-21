import { context } from "$live/live.ts";
import Form from "deco-sites/start/components/ui/GetInTouch/Form.tsx";
import BlockHeroVertical from "deco-sites/start/components/ui/GetInTouch/BlockHeroVertical.tsx";
import Clock from "deco-sites/start/components/ui/GetInTouch/Clock.tsx";

export interface Props {
  enableInspectVSCode?: boolean;
}

export default function GetInTouch({ enableInspectVSCode }: Props) {
  return (
    <main>
      {enableInspectVSCode && !context.deploymentId && (
        <>
          <Form
            firstText=""
            secondText=""
            paragraph=""
            contact={[]}
            round={[]}
          />
          <BlockHeroVertical image="" width={30} textAlternative="" />
          <Clock timeZone={[]} />
        </>
      )}
    </main>
  );
}
