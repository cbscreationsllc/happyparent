"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const items = [
  {
    image:
      "https://happyparent.nyc3.cdn.digitaloceanspaces.com/SleepRoutines.png",
    title: "Sleep Routines",
  },
  {
    image:
      "https://happyparent.nyc3.cdn.digitaloceanspaces.com/DevMilestones.png",
    title: "Development Milestones",
  },
  {
    image:
      "https://happyparent.nyc3.cdn.digitaloceanspaces.com/EducationalChallenges.png",
    title: "Educational Challenges",
  },
  {
    image:
      "https://happyparent.nyc3.cdn.digitaloceanspaces.com/FamilyDynamics.png",
    title: "Family Dynamics",
  },
  {
    image:
      "https://happyparent.nyc3.cdn.digitaloceanspaces.com/ParentingTechniques.png",
    title: "Parenting Techniques",
  },
  {
    image:
      "https://happyparent.nyc3.cdn.digitaloceanspaces.com/PsychIssues.png",
    title: "Psychological Issues",
  },
  {
    image:
      "https://happyparent.nyc3.cdn.digitaloceanspaces.com/SafetyAndFirstAid.png",
    title: "Safety And First Aid",
  },
  {
    image:
      "https://happyparent.nyc3.cdn.digitaloceanspaces.com/SpecialNeeds.png",
    title: "Special Needs",
  },
  {
    image: "https://happyparent.nyc3.cdn.digitaloceanspaces.com/Sidebar.png",
    title: "& Much More!",
  },
];

export default function CarouselSection() {
  // const [emblaRef] = useEmblaCarousel();
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  const RenderItem = (image, title) => {
    return (
      <div className="embla__slide mr-3">
        <div className="items-center justify-center flex flex-col">
          <p className="text-base font-semibold leading-7 text-gray-900 mb-3">
            {title}
          </p>
          <Image
            height={500}
            width={500}
            src={image}
            alt=""
            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg md:w-1/2"
          />
        </div>
      </div>
    );
  };

  return (
    <div
      className="overflow-hidden mx-auto pb-24 max-w-7xl px-6  lg:flex lg:items-center lg:justify-between lg:px-8"
      ref={emblaRef}
    >
      {/*  */}
      <div className="flex">
        {items.map((item) => RenderItem(item.image, item.title))}
      </div>
    </div>
  );
}
