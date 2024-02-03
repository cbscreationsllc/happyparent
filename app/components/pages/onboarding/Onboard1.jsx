import Image from "next/image";
import NextButton from "./NextButton";
import { motion } from "framer-motion";
import questions from "@/public/ask-questions.jpg";
import useMainStore from "@/app/stores/mainStore";
import { useEffect } from "react";

export default function Onboard1() {
  const { setOnboardScreen, setBodyBackground } = useMainStore();

  useEffect(() => {
    setBodyBackground("#F6C634");
  }, []);

  const handleClick = () => {
    setOnboardScreen(2);
    setBodyBackground("#88D8DF");
  };

  return (
    <div className="bg-[#F6C634] h-screen px-10 flex flex-col">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="mt-10 mb-5"
      >
        <Image
          height={500}
          width={500}
          src={questions}
          className="h-52 w-full object-contain md:h-80 lg:h-96"
          alt="man and woman confused"
        />
      </motion.div>

      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <h3 className="font-bold text-5xl lg:px-72">Parenting</h3>
        <h3 className="font-bold text-5xl mt-1 lg:px-72">questions?</h3>
      </motion.div>

      <motion.h6
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="font-normal text-lg mt-8 lg:px-72"
      >
        millions of experienced parents have the answers
      </motion.h6>

      <div className="absolute bottom-10 right-10 lg:right-72">
        <NextButton onClick={handleClick} />
      </div>
    </div>
  );
}
