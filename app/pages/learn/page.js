import React from "react";
import IntroductionSection from "./IntroductionSection";
import DemoSection from "./DemoSection";
import CtaSection from "./CtaSection";
import CarouselSection from "./CarouselSection";

const LearnMorePage = () => {
  return (
    <div>
      <IntroductionSection />
      <h2
        id="demo"
        className="mb-8 text-2xl font-bold tracking-tight text-gray-900 mx-auto  max-w-7xl px-6 md:mb-14 lg:flex lg:items-center lg:justify-between lg:px-8"
      >
        Example Chats
      </h2>
      <CarouselSection />
      <DemoSection />
      <CtaSection />
    </div>
  );
};

export default LearnMorePage;
