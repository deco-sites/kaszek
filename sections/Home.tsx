import { context } from "$live/live.ts";
import Main from "deco-sites/start/components/ui/Main/Main.tsx";
import Header from "deco-sites/start/components/ui/Header/Header.tsx";
import Footer from "deco-sites/start/components/ui/Footer/Footer.tsx";

export interface Props {
  enableInspectVSCode?: boolean;
}

export default function GetStarted({ enableInspectVSCode }: Props) {
  return (
    <section>
      {enableInspectVSCode && !context.deploymentId && (
        <div class="flex items-center justify-between flex-col">
          <Header logo="" link={[]} />
          <Main />
          <Footer contents={[]} />
        </div>
      )}
    </section>
  );
}
