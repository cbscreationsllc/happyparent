import useMainStore from "@/app/stores/mainStore";
import Onboard1 from "./Onboard1";
import Onboard2 from "./Onboard2";
import Onboard3 from "./Onboard3";

export default function Onboard() {
  const { onboardScreen } = useMainStore();

  return (
    <>
      {onboardScreen == 1 && <Onboard1 />}
      {onboardScreen == 2 && <Onboard2 />}
      {onboardScreen == 3 && <Onboard3 />}
    </>
  );
}
