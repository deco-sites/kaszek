import { context } from "$live/live.ts";
import EthosMain from "deco-sites/start/components/ui/Ethos/EthosMain.tsx";

export interface Props {
  enableInspectVSCode?: boolean;
}

export default function Ethos({ enableInspectVSCode }: Props) {
  return (
    <section>
      {enableInspectVSCode && !context.deploymentId && (
        <div>
          <EthosMain first_text="" background="" />
        </div>
      )}
    </section>
  );
}
