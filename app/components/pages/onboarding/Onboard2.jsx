import Image from "next/image";
import NextButton from "./NextButton";
import { motion } from "framer-motion";
import parentPal from "@/public/parent-pal.jpg";
import useMainStore from "@/app/stores/mainStore";

export default function Onboard2() {
  const { setOnboardScreen, setBodyBackground } = useMainStore();

  const handleClick = () => {
    setOnboardScreen(3);
    setBodyBackground("#F2D1DC");
  };
  return (
    <div className="bg-[#88D8DF] h-screen px-10 flex flex-col">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="mt-10 mb-5"
      >
        <Image
          height={500}
          width={500}
          src={parentPal}
          className="h-52 w-full object-contain md:h-80 lg:h-96"
          alt="ParentPal"
        />
      </motion.div>

      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <h3 className="font-bold text-5xl lg:px-72">Meet</h3>
        <h3 className="font-bold text-5xl mt-1 lg:px-72">HappyParent</h3>
      </motion.div>

      <motion.h6
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="font-normal text-lg mt-8 lg:px-72"
      >
        informed by a multitude of parents, HappyParent is your go-to for
        accurate, caring advice.
      </motion.h6>

      <div className="absolute bottom-10 right-10 lg:right-72">
        <NextButton onClick={handleClick} />
      </div>
    </div>
  );
}
