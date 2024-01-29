import { CheckCircleIcon } from "@heroicons/react/20/solid";

export default function PartnerDemoSection() {
  return (
    <div className="bg-white px-6 lg:px-8" id="demo">
      <div className="mx-auto max-w-7xl text-base leading-7 text-gray-700 sm:p-6">
        <p className="text-base font-semibold leading-7 text-indigo-600">
          Partner Program
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Join HappyParent&apos;s Affiliate Family
        </h1>
        <p className="mt-6 text-xl leading-8">
          Unlock a world of opportunity and impact by becoming a HappyParent
          partner. Connect parents to a tool that revolutionizes their parenting
          journey while enjoying substantial benefits.
        </p>
        <div className="mt-10 max-w-2xl">
          <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Generous Commissions.
                </strong>{" "}
                Earn a 35% monthly commission for users you bring to HappyParent
                who subscribe.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Exclusive Discounts.
                </strong>{" "}
                Get $15 off your monthly subscription, reducing it to only $10
                per month.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Extended Customer Benefits.
                </strong>{" "}
                Your referred customers enjoy a $10 discount on their
                subscription for the first 3 months.
              </span>
            </li>

            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Onboarding Perks.
                </strong>{" "}
                Receive around 50 free questions to familiarize yourself with
                the platform after completing the onboarding process.
              </span>
            </li>
          </ul>
          <p className="mt-8">
            Embrace the potential to earn significantly. Some of our partners
            achieve earnings of $5k, $10k, $50k, or even over $100k monthly.
            Your success depends on how well you engage and sell to your
            audience. We have the innovative product; you have the influential
            audience. That&apos;s why we believe in rewarding you with a 35%
            commission rate.
          </p>
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            Expand Your Impact, Grow Your Earnings
          </h2>
          <p className="mt-6">
            As a HappyParent partner, you&apos;re not just earning; you&apos;re
            empowering. You&apos;ll be introducing parents to an AI tool that
            offers personalized, expert-backed parenting advice. Join us in our
            mission to make parenting more informed and less stressful.
          </p>
        </div>
      </div>
    </div>
  );
}
