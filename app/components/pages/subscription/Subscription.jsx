import useMainStore from "@/app/stores/mainStore";
import { auth } from "@/firebase";
import { CheckIcon } from "@heroicons/react/20/solid";
import { loadStripe } from "@stripe/stripe-js";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const features = [
  "24/7 AI Assistance",
  "Personalized Responses",
  "Wide Range of Topics",
  "Expert-Backed Information",
  "≈6k questions a month",
];

export default function Subscription() {
  const {
    setSubscriptionModalOpen,
    setAffiliateModalOpen,
    user,
    setMainScreen,
    setSubscriptionScreen,
    setShowLearnMore,
  } = useMainStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePartnerClick = () => {
    if (user?.stripeAccountId) {
      setSubscriptionModalOpen(false);
      setMainScreen(2);
    } else {
      setSubscriptionModalOpen(false);
      setAffiliateModalOpen(true);
    }
  };

  const handleNav = () => {
    setSubscriptionModalOpen(false);
    setShowLearnMore(true);

    setTimeout(() => {
      router.push("/pages/learn");
    }, 1200);
  };

  const continueToPayment = async () => {
    setLoading(true);
    const functions = getFunctions();
    const continueToPaymentFn = httpsCallable(functions, "continueToPayment");
    const stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    );

    const stripeCustomerId = user?.stripeCustomerId
      ? user.stripeCustomerId
      : null;

    try {
      const response = await continueToPaymentFn({
        uid: auth.currentUser.uid,
        stripeCustomerId,
      });
      const sessionId = response.data.sessionId;
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.log(error);
      if (error.message == "Referral code does not exist.") {
        setInvalidCode(true);
      } else {
        alert(
          "Oops, we encountered an error while trying to create your checkout session. Please try again."
        );
      }
    }

    setLoading(false);
  };

  return (
    <div className="mx-auto items-center">
      <div className="bg-white sm:mx-8 lg:mx-0 rounded-t-3xl  rounded-3xl  px-2 py-4 ">
        <div className="flex flex-col items-center">
          <p className="text-xl font-semibold">Subscribe for Access</p>
          <p className="mt-4 flex items-baseline gap-x-1">
            <span className="text-gray-900 text-base font-regular tracking-tight">
              {user?.affiliateCode && "$10"}
              {!user?.affiliateCode && "$25"}
            </span>
            <span className="text-gray-500 text-base">/</span>
            <span className="text-gray-500 text-base">month</span>
          </p>
        </div>

        <p className="text-gray-600 mt-6 text-sm leading-7 text-center">
          HappyParent: Your AI-Powered Parenting Partner
        </p>
        <ul
          role="list"
          className="text-gray-600 mt-8 space-y-3 text-sm leading-6 sm:mt-10"
        >
          {features.map((feature) => (
            <li key={feature} className="flex gap-x-3 text-center">
              <CheckIcon
                className="text-[#88D8DF] h-6 w-5 flex-none"
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>
        <div
          onClick={() => setSubscriptionScreen(2)}
          className="text-gray-600 border border-[#88D8DF] mt-8 block rounded-md py-2.5 px-3.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer"
        >
          {!loading && "Get Started Today"}
          {loading && <ClipLoader size={20} color="#F2D1DC" />}
        </div>

        <div
          onClick={handleNav}
          className="text-gray-600 border border-[#F2D1DC] mt-2 block rounded-md py-2.5 px-3.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer"
        >
          Learn More
        </div>

        <div
          onClick={handlePartnerClick}
          className="text-gray-600 border border-[#F2D1DC] mt-2 block rounded-md py-2.5 px-3.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer"
        >
          {user?.stripeAccountId && "Partner Dashboard"}
          {!user?.stripeAccountId && "Become a Partner"}
        </div>
      </div>
    </div>
  );
}
