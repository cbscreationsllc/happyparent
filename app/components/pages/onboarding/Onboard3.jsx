import Image from "next/image";
import NextButton from "./NextButton";
import { motion } from "framer-motion";
import happyFamily from "@/public/happy-family.jpg";
import useMainStore from "@/app/stores/mainStore";

export default function Onboard3() {
  const { setCurrentScreen, setBodyBackground } = useMainStore();

  const handleClick = () => {
    setCurrentScreen(2);
    setBodyBackground("#F2D1DC");
  };

  return (
    <div className="bg-[#F2D1DC] h-screen px-10 flex flex-col">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="mt-10 mb-5"
      >
        <Image
          height={500}
          width={500}
          src={happyFamily}
          className="h-52 w-full object-contain md:h-80 lg:h-96"
          alt="happy family"
        />
      </motion.div>

      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <h3 className="font-bold text-5xl lg:px-72">Relax</h3>
        <h3 className="font-bold text-5xl mt-1 lg:px-72">& enjoy</h3>
      </motion.div>

      <motion.h6
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="font-normal text-lg mt-8 lg:px-72"
      >
        parenting is something to enjoy, let ParentPal handle the stressful
        situations for you. Get started today.
      </motion.h6>

      <div className="absolute bottom-10 right-10 lg:right-72">
        <NextButton onClick={handleClick} />
      </div>
    </div>
  );
}
