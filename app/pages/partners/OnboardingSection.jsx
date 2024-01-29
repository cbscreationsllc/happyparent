import { InformationCircleIcon } from "@heroicons/react/20/solid";

export default function OnboardingSection() {
  return (
    <div className="bg-white px-6 pb-20 lg:px-8" id="onboarding">
      <div className="mx-auto max-w-7xl text-base leading-7 text-gray-700 sm:p-6">
        <p className="text-base font-semibold leading-7 text-indigo-600">
          Onboarding Process
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Your Path to Becoming a HappyParent Partner
        </h1>
        <p className="mt-6 text-xl leading-8">
          Begin your journey with HappyParent and Stripe to unlock the potential
          of our partner program. Follow these steps to onboard smoothly and
          start your rewarding experience.
        </p>
        <div className="mt-10 max-w-2xl">
          <ul role="list" className="space-y-8 text-gray-600">
            <li className="flex gap-x-3">
              <InformationCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Step 1: Begin Onboarding.
                </strong>{" "}
                Click 'Become a Partner' on the 'Subscribe for Access' modal
                when logged in. If you already have a subscription, or the modal
                doesn't appear, navigate to 'Settings' in the nav bar.
              </span>
            </li>
            <li className="flex gap-x-3">
              <InformationCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Step 2: Enter Invitation Code.
                </strong>{" "}
                Input your 5-digit invitation code. A valid code will redirect
                you to Stripe's onboarding process.
              </span>
            </li>
            <li className="flex gap-x-3">
              <InformationCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Step 3: Complete Stripe Onboarding.
                </strong>{" "}
                Fill out the required information on Stripe. Upon completion,
                you'll be redirected to your affiliate dashboard.
              </span>
            </li>

            <li className="flex gap-x-3">
              <InformationCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Step 4: Understand the Statement Descriptor.
                </strong>{" "}
                During Stripe's onboarding, you'll encounter the 'Statement
                Descriptor' section. This is the text that will appear on your
                subscribers' bank statements when they make a payment. It's
                important to know that this will display 'HappyParent' to ensure
                clarity and recognition for your subscribers. Whatever you enter
                there will only matter if you create a stripe product and begin
                selling on their platform.
              </span>
            </li>
            <li className="flex gap-x-3">
              <InformationCircleIcon
                className="mt-1 h-5 w-5 flex-none text-indigo-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-gray-900">
                  Step 5: Finalize Onboarding.
                </strong>{" "}
                If onboarding is successful, you'll see your affiliate code and
                the option to copy your partner link. If not, a 'Complete
                Onboarding' button will appear. Stripe may require multiple
                attempts for verification.
              </span>
            </li>
          </ul>

          <p className="mt-8">
            Once completed, you're ready to use your partner code/link to direct
            users to HappyParent. When users subscribe using your code, payments
            will be made to your Stripe account, from which you can transfer
            funds to your bank.
          </p>

          <div className="mt-10 max-w-2xl">
            <div className="rounded-md bg-indigo-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <InformationCircleIcon
                    className="h-5 w-5 text-indigo-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-indigo-800">
                    Enhance Your Partnership with Content Creation
                  </h3>
                  <div className="mt-2 text-sm text-indigo-700">
                    <p>
                      As a HappyParent partner, creating engaging content about
                      our platform can significantly boost your subscriber
                      count. Share your experiences, tips, and insights about
                      HappyParent on your blog, social media, or video channels
                      to attract and inform potential subscribers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-8">
            <strong className="font-semibold text-gray-900">Start Now:</strong>{" "}
            Take the first step towards a lucrative and impactful partnership
            with HappyParent.
          </p>
        </div>
      </div>
    </div>
  );
}
