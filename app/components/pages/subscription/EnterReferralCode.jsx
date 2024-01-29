import useMainStore from "@/app/stores/mainStore";
import { auth } from "@/firebase";
import { EnvelopeOpenIcon } from "@heroicons/react/20/solid";
import { loadStripe } from "@stripe/stripe-js";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function EnterReferralCode() {
  const [invalidCode, setInvalidCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [referralCode, setReferralCode] = useState(null);
  const [isPartner, setIsPartner] = useState(false);
  const { user, code } = useMainStore();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (user?.affiliateCode) {
      setIsPartner(true);
      continueToPayment();
      return;
    }

    if (code || searchParams.get("code")) {
      setReferralCode(code ? code : searchParams.get("code"));
    }
  }, []);

  const continueToPayment = async () => {
    setInvalidCode(false);
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
        referralCode,
        uid: auth.currentUser.uid,
        stripeCustomerId,
      });
      const sessionId = response.data.sessionId;
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
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

  if (isPartner) {
    return (
      <div className="mx-auto items-center">
        <div className="bg-white sm:mx-8 lg:mx-0 rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl rounded-3xl  px-2 py-4  sm:p-10">
          <div className="flex flex-col items-center p-5">
            <ClipLoader size={60} color="#F2D1DC" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto items-center">
      <div className="bg-white sm:mx-8 lg:mx-0 rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl rounded-3xl  px-2 py-4  sm:p-10">
        <div className="flex flex-col items-center">
          <p className="text-xl font-semibold">Referral Code</p>
        </div>

        <p className="text-gray-600 mt-6 text-sm leading-7 text-center">
          Do you have a referral code?
        </p>

        <div className="relative mt-2 rounded-md shadow-sm w-1/2 mx-auto">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <EnvelopeOpenIcon
              color="#F2D1DC"
              className="h-5 w-5"
              aria-hidden="true"
            />
          </div>
          <input
            autoCorrect="off"
            autoComplete="off"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            autoFocus={false}
            autoCapitalize="off"
            type="text"
            name="code"
            id="code"
            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-400 ring-1 ring-inset ring-[#F2D1DC] placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 outline-none"
            placeholder="5 Digit Code"
          />
        </div>
        {invalidCode && (
          <p className="text-center mt-4 text-sm leading-7 mb-[-16px]">
            <span className="text-red-400">x </span>
            Invalid Code
          </p>
        )}

        <button
          className="text-gray-600 border border-[#88D8DF] mt-8 block rounded-md py-2.5 px-3.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10 w-full"
          onClick={continueToPayment}
        >
          {!loading && "Continue"}
          {loading && <ClipLoader size={20} color="#F2D1DC" />}
        </button>
      </div>
    </div>
  );
}
