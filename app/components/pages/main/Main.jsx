"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CheckCircleIcon,
  Cog6ToothIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Chat from "./Chat";
import useMainStore from "@/app/stores/mainStore";
import AffiliateModal from "../affiliate/AffiliateModal";
import Affiliate from "../affiliate/Affiliate";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import SubscriptionModal from "../subscription/SubscriptionModal";
import Image from "next/image";
import questions from "@/public/questions.png";
import SettingsModal from "../../settings/SettingsModal";
import { useSearchParams } from "next/navigation";
import useThreadStore from "@/app/stores/threadStore";
import ThreadsComponent from "../../ThreadsComponent";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";
import PaymentSuccess from "../../PaymentSuccess";

export default function Main() {
  const {
    setUser,
    mainScreen,
    setBodyBackground,
    user,
    setSubscriptionModalOpen,
    setSubscriptionScreen,
    setSettingsModalOpen,
    sidebarOpen,
    setSidebarOpen,
    setOnboardScreen,
    setMainScreen,
    setSettingsScreen,
    showLearnMore,
  } = useMainStore();
  const { threadName, setThreadName, threadId, threadDocId, resetThread } =
    useThreadStore();
  const searchParams = useSearchParams();
  const [editName, setEditName] = useState(false);
  const nameRef = useRef();
  const [currentName, setCurrentName] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const redirect = searchParams.get("redirect");
    setBodyBackground("#fff");

    if (auth.currentUser) {
      const userDocRef = doc(db, "users", auth.currentUser.uid);

      const unsubscribe = onSnapshot(
        userDocRef,
        (doc) => {
          if (doc.exists()) {
            setUser(doc.data());
            handleModal({ user: doc.data(), redirect });
          }
        },
        (error) => {}
      );

      return () => unsubscribe();
    }
  }, []);

  const handleModal = ({ user, redirect }) => {
    if (redirect == "stripeLink") {
      setSubscriptionModalOpen(false);
    } else if (redirect == "success" && user?.tokens < 400) {
      setSubscriptionModalOpen(false);
      setTimeout(() => {
        setOpen(true);
        setText(
          "Please allow us a few minutes to update your account. Happy Parenting 🤗"
        );
        setTitle("Payment Successful");
      }, 200);
    } else if (user?.tokens > 400 || user?.subscription)
      setSubscriptionModalOpen(false);
    else if (user?.tokens < 400 && user?.subscription) {
      setSubscriptionModalOpen(false);
    } else {
      setSubscriptionModalOpen(true);
      setSubscriptionScreen(1);
    }
  };

  const updateName = async () => {
    setLoading(true);
    if (threadId) {
      const threadDocRef = doc(db, "threads", threadDocId);
      try {
        await updateDoc(threadDocRef, { threadName });
        setEditName(false);
      } catch (error) {
        alert(
          "Oops, we encountered an error while trying to update the name. Please try again."
        );
      }
    } else {
      setEditName(false);
    }
    setLoading(false);
  };

  return (
    <>
      <div>
        <AffiliateModal />
        <SubscriptionModal />
        <SettingsModal />
        <PaymentSuccess
          open={open}
          setOpen={setOpen}
          title={title}
          setTitle={setTitle}
          text={text}
          setText={setText}
        />
        {showLearnMore && (
          <motion.div
            initial={{ y: -1000 }}
            animate={{ y: 0 }}
            transition={{ ease: "easeInOut", duration: 1 }}
            className="h-screen w-screen bg-white z-50 absolute"
          />
        )}

        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>

                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                    <div className="bg-white mx-[-24px] border-b border-gray-200 pb-2">
                      <div className="px-6">
                        <div
                          className="flex h-16 shrink-0 items-center"
                          onClick={() => {
                            setSidebarOpen(false);
                            setMainScreen(1);
                          }}
                        >
                          <Image
                            height={500}
                            width={500}
                            className="h-8 w-auto"
                            src={questions}
                            alt="Your Company"
                          />
                          <h3 className="ml-4 text-gray-700 font-bold">
                            Happy
                            <span className="">Parent</span>
                          </h3>
                        </div>
                        <p className="text-sm mt-1 font-semibold text-gray-700">
                          Estimated Questions: {Math.floor(user?.tokens / 400)}
                        </p>
                      </div>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li className="max-h-[400px] overflow-y-scroll overflow-x-hidden">
                          <ul role="list" className="-mx-2 space-y-1">
                            <ThreadsComponent />
                          </ul>
                        </li>

                        <li className="mt-auto">
                          <div
                            onClick={() => {
                              setSidebarOpen(false);
                              setOnboardScreen(1);
                              setSettingsModalOpen(true);
                              setSettingsScreen(1);
                            }}
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 cursor-pointer"
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-[#88D8DF]"
                              aria-hidden="true"
                            />
                            Settings
                          </div>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
            <div className="bg-white mx-[-24px] border-b border-gray-200 pb-2">
              <div className="px-6">
                <div
                  className="flex h-16 shrink-0 items-center"
                  onClick={() => {
                    setSidebarOpen(false);
                    setMainScreen(1);
                  }}
                >
                  <Image
                    height={500}
                    width={500}
                    className="h-8 w-auto"
                    src={questions}
                    alt="Your Company"
                  />
                  <h3 className="ml-4 text-gray-900 font-bold">
                    Happy
                    <span className="">Parent</span>
                  </h3>
                </div>
                <p className="text-sm mt-1 font-semibold text-gray-700">
                  Estimated Questions: {Math.floor(user?.tokens / 400)}
                </p>
              </div>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li className="max-h-[400px] overflow-y-scroll overflow-x-hidden lg:max-h-[650px] scrollbar-hide">
                  <ul role="list" className="-mx-2 space-y-1">
                    <ThreadsComponent />
                  </ul>
                </li>

                <li className="mt-auto">
                  <div
                    onClick={() => {
                      setSidebarOpen(false);
                      setOnboardScreen(1);
                      setSettingsModalOpen(true);
                      setSettingsScreen(1);
                    }}
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-[#88D8DF]"
                      aria-hidden="true"
                    />
                    Settings
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div
              className="h-6 w-px bg-gray-200 lg:hidden"
              aria-hidden="true"
            />
            {mainScreen == 2 && (
              <div className="flex flex-1 items-center justify-between">
                <div className="flex items-center">
                  {!editName && (
                    <>
                      <h1>Total Subscribers: </h1>
                      <span className="ml-2">
                        <p>{user?.totalSubscribers}</p>
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}
            {mainScreen == 1 && (
              <div className="flex flex-1 items-center justify-between">
                <div className="flex items-center">
                  {!editName && (
                    <>
                      <h1>{threadName}</h1>
                      <span className="ml-2">
                        <PencilSquareIcon
                          className="h-4 w-4"
                          aria-hidden="true"
                          onClick={() => {
                            setCurrentName(threadName);
                            setEditName(true);
                            setTimeout(() => {
                              nameRef?.current?.focus();
                            }, 200);
                          }}
                        />
                      </span>
                    </>
                  )}

                  {editName && (
                    <>
                      <input
                        ref={nameRef}
                        maxLength={30}
                        className="w-full border border-[#88D8DF] caret-[#88D8DF] outline-none p-1"
                        type="text"
                        value={threadName}
                        onChange={(e) => setThreadName(e.target.value)}
                      />

                      {!loading && (
                        <>
                          <span className="ml-2">
                            <CheckCircleIcon
                              onClick={updateName}
                              className="h-6 w-6 text-[#88D8DF]"
                              aria-hidden="true"
                            />
                          </span>
                          <span className="ml-1">
                            <XCircleIcon
                              onClick={() => {
                                setThreadName(currentName);
                                setEditName(false);
                              }}
                              className="h-6 w-6 text-red-300"
                              aria-hidden="true"
                            />
                          </span>
                        </>
                      )}
                      <span className="ml-1">
                        {loading && <ClipLoader size={24} color="#F2D1DC" />}
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                  <div
                    className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                    aria-hidden="true"
                  />

                  <div>
                    <PlusCircleIcon
                      className="h-6 w-6 text-gray-700"
                      onClick={() => resetThread()}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <main className="py-0 bg-white h-screen-minus-64">
            {mainScreen == 1 && (
              <Chat setOpen={setOpen} setText={setText} setTitle={setTitle} />
            )}
            {mainScreen == 2 && <Affiliate />}
          </main>
        </div>
      </div>
    </>
  );
}
