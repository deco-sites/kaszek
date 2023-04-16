import EntrepreneurialCapital from "deco-sites/start/components/Main/EntrepreneurialCapital.tsx";
import AboutKaszek from "deco-sites/start/components/Main/AboutKaszek.tsx";

export default function Main() {
  return (
    <main class="top-0 left-0 absolute z-0 flex-center-between flex-col w-full">
      <EntrepreneurialCapital />
      <AboutKaszek />
    </main>
  );
}
