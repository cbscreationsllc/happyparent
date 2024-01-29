"use client";
import { useRouter } from "next/navigation";

export default function PartnerCtaSection() {
  const router = useRouter();
  const scrollToElement = () => {
    const element = document.getElementById("onboarding");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Unleash Your Earning Potential as a HappyParent Partner
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Imagine tapping into a market of 1.4 billion new parents from the
            past 5 years. With 140 million babies born each year, the
            opportunity is vast. Reach just 0.01% of these parents – that&apos;s
            not even 1% – and you could be making over a million dollars a
            month. Seize this incredible chance to impact lives and skyrocket
            your earnings!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <div
              onClick={() => router.push("/")}
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
            >
              Become a Partner
            </div>
            <div
              onClick={scrollToElement}
              className="text-sm font-semibold leading-6 text-white cursor-pointer"
            >
              Learn How <span aria-hidden="true">→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
