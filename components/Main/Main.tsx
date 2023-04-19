import EntrepreneurialCapital from "deco-sites/start/components/Main/EntrepreneurialCapital.tsx";
import AboutKaszek from "deco-sites/start/components/Main/AboutKaszek.tsx";
import Entrepreneurs from "deco-sites/start/components/Main/Entrepreneurs.tsx";
import FaqSection from "deco-sites/start/sections/FaqSection.tsx";
export type { Faq, Props } from "../../components/Main/FaqSection.tsx";

export default function Main() {
  return (
    <main class="top-0 left-0 z-0 flex-center-between flex-col w-full">
      <EntrepreneurialCapital />
      <AboutKaszek title="" first_description="" city={[]}/>
      <Entrepreneurs />
      <FaqSection faqs={[]} />
    </main>
  );
}
