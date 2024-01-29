"use client";
import useMainStore from "@/app/stores/mainStore";
import { useEffect } from "react";
import { GridLoader } from "react-spinners";

export default function Splash() {
  const { setBodyBackground } = useMainStore();

  useEffect(() => {
    setBodyBackground("#F6C634");
  }, []);

  return (
    <div className="h-screen  flex flex-col items-center justify-center bg-[#F6C634]">
      <div className="absolute top-20 text-2xl font-bold">
        <h1>HappyParent</h1>
      </div>

      <GridLoader />
      <p className="mt-5">Loading...</p>
    </div>
  );
}
