import useMainStore from "@/app/stores/mainStore";
import { auth } from "@/firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function CancelSubscription() {
  const [loading, setLoading] = useState(false);
  const { user, setSettingsScreen } = useMainStore();

  const cancelSubscription = async () => {
    setLoading(true);
    const functions = getFunctions();
    const cancelSubscriptionFn = httpsCallable(functions, "cancelSubscription");

    const affiliateDocId = user?.affiliateDocId;
    const customerId = auth.currentUser.uid;
    const stripeSubscriptionId = user?.stripeSubscriptionId;

    try {
      await cancelSubscriptionFn({
        affiliateDocId,
        customerId,
        stripeSubscriptionId,
      });
    } catch (error) {
      alert(
        "Oops, we encountered an error while trying to cancel your subscription. Please try again. & if this error persists, contact cbscreationsllc@gmail.com as soon as possible. We will issue you a refund if this happens. Sorry for the inconvinece."
      );
    }

    setSettingsScreen(1);
    setLoading(false);
  };

  function convertTimestampToReadableDate() {
    const date = new Date(user?.periodEnd * 1000);

    const dayOfWeek = date.toLocaleString("en-US", { weekday: "short" });
    const day = date.toLocaleString("en-US", { day: "2-digit" });
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    return `${dayOfWeek}, ${day} ${month} ${year}`;
  }

  return (
    <div className="mx-auto items-center">
      <div className="bg-white sm:mx-8 lg:mx-0 rounded-t-3xl sm:rounded-b-none rounded-3xl  px-2 py-4">
        <div className="flex flex-col items-center">
          <p className="text-xl font-semibold mb-4">Cancel Subscription</p>
          <p className="text-sm font-normal mb-4 text-center">
            Your subscription renews on {convertTimestampToReadableDate()}. Are
            you sure you would like to cancel your subscription? This will take
            effect immediately.
          </p>
        </div>

        <div
          onClick={cancelSubscription}
          className="text-gray-600 border border-[#F2D1DC] mt-2 block rounded-md py-2.5 px-3.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer"
        >
          {!loading && "I'm sure"}
          {loading && <ClipLoader size={20} color="#F2D1DC" />}
        </div>
      </div>
    </div>
  );
}
