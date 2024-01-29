"use client";
import { Open_Sans } from "next/font/google";
import useMainStore from "@/app/stores/mainStore";
import { Suspense } from "react";

const fontOpenSans = Open_Sans({ subsets: ["latin"] });

export default function Layout({ children }) {
  const { bodyBackground } = useMainStore();

  return (
    <Suspense>
      <body
        className={fontOpenSans.className}
        style={{ backgroundColor: bodyBackground }}
      >
        {children}
      </body>
    </Suspense>
  );
}
