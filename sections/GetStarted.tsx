import { context } from "$live/live.ts";
import Main from "deco-sites/start/components/Main/Main.tsx";
import Header from "deco-sites/start/components/Header/Header.tsx";
import Footer from "deco-sites/start/components/Footer/Footer.tsx";

export interface Props {
  enableInspectVSCode?: boolean;
}

export default function GetStarted({ enableInspectVSCode }: Props) {
  return (
    <section>
      {enableInspectVSCode && !context.deploymentId && (
        <div class="min-h-screen flex-center-between flex-col">
          <Header />
          <Main />
          <Footer contents={[]}/>
        </div>
      )}
    </section>
  );
}
