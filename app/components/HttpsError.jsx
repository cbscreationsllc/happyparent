import useMainStore from "@/app/stores/mainStore";
import useThreadStore from "../stores/threadStore";

export default function HttpsError() {
  const { setSettingsModalOpen, setSettingsScreen, setSubscriptionModalOpen } =
    useMainStore();

  const { errorMessage, handleRetry } = useThreadStore();

  const handleClick = async () => {
    if (errorMessage != "Not enough tokens" && errorMessage != "nope") {
      handleRetry();
      setSettingsModalOpen(false);
    } else {
      if (errorMessage == "nope") {
        setSubscriptionModalOpen(true);
      }
      setSettingsModalOpen(false);
      setTimeout(() => {
        setSettingsScreen(1);
      }, 500);
    }
  };

  return (
    <div className="mx-auto items-center">
      <div className="bg-white sm:mx-8 lg:mx-0 rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl rounded-3xl  px-2 py-4">
        <div className="flex flex-col items-center mb-4">
          <p className="text-xl font-semibold">Error</p>
        </div>
        {errorMessage == "Not enough tokens" && (
          <p className="text-center text-sm">
            You have used the max amount of questions allowed for this month.
            Please wait for your subscription to renew for the next month to
            continue using our service. Sorry for the inconvenience. We are
            actively developing a solution.
          </p>
        )}

        {errorMessage == "nope" && (
          <p className="text-center text-sm">
            Please subscribe for access to HappyParent.
          </p>
        )}

        {errorMessage != "Not enough tokens" && errorMessage != "nope" && (
          <p className="text-center text-sm">
            Oops, something went wrong on our servers. Please try again.
          </p>
        )}

        <div
          onClick={handleClick}
          className="text-gray-600 border border-[#F2D1DC] mt-4 block rounded-md py-2.5 px-3.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer"
        >
          {(errorMessage == "Not enough tokens" || errorMessage == "nope") &&
            "Got it"}
          {errorMessage != "Not enough tokens" &&
            errorMessage != "nope" &&
            "Retry"}
        </div>
      </div>
    </div>
  );
}
