import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useMainStore from "../stores/mainStore";
import { ClipLoader } from "react-spinners";
import { auth } from "@/firebase";
import { deleteUser, sendEmailVerification } from "firebase/auth";

export default function EmailVerification() {
  const { showEmailModal, setShowEmailModal } = useMainStore();
  const [showButton, setShowButton] = useState(true);

  const resend = async () => {
    try {
      sendEmailVerification(auth.currentUser, {
        url: "https://happyparent.vercel.app/",
      });
      setShowButton(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAccount = async () => {
    try {
      await deleteUser(auth.currentUser);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Transition.Root show={showEmailModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setShowEmailModal}>
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

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
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
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F2D1DC]">
                    <ClipLoader size={20} color="#88D8DF" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Verify Email
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        An email has been sent to you. Please go verify this
                        email. Check your spam folder if you do not see it.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  {showButton && (
                    <button
                      onClick={resend}
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-[#88D8DF] px-3 py-2 text-sm font-semibold text-white shadow-sm "
                    >
                      Resend Email
                    </button>
                  )}

                  {!showButton && (
                    <p className="text-sm text-gray-500 text-center">
                      Email resent.
                    </p>
                  )}
                </div>
                <div className="mt-2 sm:mt-6">
                  <button
                    onClick={deleteAccount}
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-[#88D8DF] px-3 py-2 text-sm font-semibold text-white shadow-sm "
                  >
                    Wrong Email
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
