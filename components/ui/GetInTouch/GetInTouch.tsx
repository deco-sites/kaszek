import { context } from "$live/live.ts";
import Form from "deco-sites/start/components/ui/GetInTouch/Form.tsx";

export interface Props {
  enableInspectVSCode?: boolean;
}

export default function GetInTouch({ enableInspectVSCode }: Props) {
  return (
    <main>
      {enableInspectVSCode && !context.deploymentId && (
        <>
          <Form firstText="" secondText="" paragraph="" radioOption={[]} />
        </>
      )}
    </main>
  );
}
