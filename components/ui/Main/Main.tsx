import EntrepreneurialCapital from "deco-sites/start/components/ui/Main/EntrepreneurialCapital.tsx";
import AboutKaszek from "deco-sites/start/components/ui/Main/AboutKaszek.tsx";
import Entrepreneurs from "deco-sites/start/components/ui/Main/Entrepreneurs.tsx";
import FaqSection from "deco-sites/start/sections/FaqSection.tsx";
export type { Faq, Props } from "./FaqSection.tsx";

export default function Main() {
  return (
    <main class="top-0 left-0 z-0 flex items-center justify-between flex-col w-full">
      <EntrepreneurialCapital title="" background="" />
      <AboutKaszek img="" title="" firstDescription="" city={[]} />
      <Entrepreneurs result={[]} />
      <FaqSection title_section="" faqs={[]} />
    </main>
  );
}
