import useMainStore from "@/app/stores/mainStore";
import React from "react";

const NextButton = ({ onClick }) => {
  const { onboardScreen } = useMainStore();

  const isFilled = (section) => onboardScreen >= section;

  return (
    <button
      className="relative w-16 h-16 bg-white rounded-lg flex items-center justify-center"
      onClick={onClick}
    >
      <div
        className={`absolute w-full h-full rounded-lg ${
          isFilled(1)
            ? "border-t-2 border-r-2 border-black"
            : "border-transparent"
        }`}
      />
      <div
        className={`absolute w-full h-full rounded-lg ${
          isFilled(2)
            ? "border-r-2 border-b-2 border-black"
            : "border-transparent"
        }`}
      />
      <div
        className={`absolute w-full h-full rounded-lg ${
          isFilled(3)
            ? "border-b-2 border-l-2 border-black"
            : "border-transparent"
        }`}
      />
      <span className="text-lg font-bold text-black">{">"}</span>
    </button>
  );
};

export default NextButton;
