import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useMainStore from "../../../stores/mainStore";
import { EnvelopeOpenIcon } from "@heroicons/react/20/solid";
import { getFunctions, httpsCallable } from "firebase/functions";
import { auth } from "@/firebase";
import { ClipLoader } from "react-spinners";

export default function AffiliateModal() {
  const { affiliateModalOpen, setAffiliateModalOpen } = useMainStore();
  const buttonRef = useRef(null);
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const createStripeLink = async () => {
    setLoading(true);
    const functions = getFunctions();
    const createStripeLinkFn = httpsCallable(functions, "createStripeLink");

    try {
      const response = await createStripeLinkFn({
        code: inviteCode,
        uid: auth.currentUser.uid,
        stripeId: null,
      });
      window.location.href = response.data.link;
    } catch (error) {
      console.log(error);

      if (error.message == "Invite code not found") {
        setError(true);
      } else {
        alert(
          "Oops, something went wrong while trying to create your onboarding link. Please try again."
        );
      }
    }

    setLoading(false);
  };

  return (
    <Transition.Root show={affiliateModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={setAffiliateModalOpen}
        initialFocus={buttonRef}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <button
                    ref={buttonRef}
                    className="absolute opacity-0"
                    tabIndex={-1}
                    aria-hidden="true"
                  ></button>

                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Invite Code
                    </Dialog.Title>
                    <div>
                      <div className="relative mt-2 rounded-md shadow-sm w-1/2 mx-auto">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <EnvelopeOpenIcon
                            color="#F2D1DC"
                            className="h-5 w-5 "
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          value={inviteCode}
                          onChange={(e) => setInviteCode(e.target.value)}
                          autoFocus={false}
                          type="tel"
                          name="code"
                          id="code"
                          className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 outline-none"
                          placeholder="5 Digit Code"
                        />
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        If you do not have a code and want to become a partner;
                        reach out to cbcreationsllc@gmail.com
                      </p>
                    </div>
                    {error && (
                      <p className="text-center mt-4 mb-2 text-sm leading-7">
                        <span className="text-red-400">x </span>
                        Invalid Code
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-[#88D8DF] px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    onClick={createStripeLink}
                  >
                    {!loading && "Continue to Onboard"}
                    {loading && <ClipLoader size={20} color="#F2D1DC" />}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
