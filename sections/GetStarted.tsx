import { context } from "$live/live.ts";
import Main from "deco-sites/start/components/Main/Main.tsx";
import Header from "deco-sites/start/components/Header/Header.tsx";

export interface Props {
  enableInspectVSCode?: boolean;
}

export default function GetStarted({ enableInspectVSCode }: Props) {
  return (
    <section>
      {enableInspectVSCode && !context.deploymentId && (
        <div class="h-screen flex justify-center">
          <Header />
          <Main />
        </div>
      )}
    </section>
  );
}
