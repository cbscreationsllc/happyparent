import useMainStore from "@/app/stores/mainStore";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function Settings() {
  const [loading, setLoading] = useState(false);
  const {
    setSettingsModalOpen,
    setAffiliateModalOpen,
    user,
    setMainScreen,
    resetVals,
    setSettingsScreen,
  } = useMainStore();

  const handleLogout = async () => {
    if (!loading) {
      setLoading(true);
      setTimeout(async () => {
        await signOut(auth);
        resetVals();
      }, 500);
    }
  };

  const handlePartnerClick = () => {
    if (user?.stripeAccountId) {
      setSettingsModalOpen(false);
      setMainScreen(2);
    } else {
      setSettingsModalOpen(false);
      setAffiliateModalOpen(true);
    }
  };

  return (
    <div className="mx-auto grid max-w-lg grid-cols-1 items-center gap-y-6 sm:gap-y-0 lg:max-w-4xl">
      <div className="bg-white sm:mx-8 lg:mx-0 rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl rounded-3xl  px-2 py-4  sm:p-10">
        <div className="flex flex-col items-center mb-8">
          <p className="text-xl font-semibold">Settings</p>
        </div>

        {user?.subscription && (
          <div
            onClick={() => setSettingsScreen(2)}
            className="text-gray-600 border border-[#88D8DF] block rounded-md py-2.5 px-3.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer sm:mt-4"
          >
            Cancel Subscription
          </div>
        )}

        <div
          onClick={handlePartnerClick}
          className="text-gray-600 border border-[#88D8DF] mt-2 block rounded-md py-2.5 px-3.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer sm:mt-4"
        >
          {user?.stripeAccountId && "Partner Dashboard"}
          {!user?.stripeAccountId && "Become a Partner"}
        </div>

        <div
          onClick={handleLogout}
          className="text-gray-600 border border-[#F2D1DC] mt-2 block rounded-md py-2.5 px-3.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer sm:mt-4"
        >
          {!loading && "Logout"}
          {loading && <ClipLoader size={20} color="#F2D1DC" />}
        </div>
      </div>
    </div>
  );
}
