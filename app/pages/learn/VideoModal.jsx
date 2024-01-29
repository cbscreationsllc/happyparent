"use client";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function VideoModal({ isOpen, setIsOpen }) {
  const [w1, setW1] = useState(100);
  const [w2, setW2] = useState(100);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setW1(window.screen.width - 100);
      setW2(window.screen.availWidth - 100);
    }
  }, []);

  const opts = {
    width: w1,
    height: "390",
    playerVars: {
      autoplay: 1,
      controls: 1,
      fullscreen: 1,
    },
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsOpen(false)}
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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 w-full">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:p-6 w-screen">
                <div className="h-[450px]" style={{ width: w2 }}>
                  {isOpen && (
                    <div style={modalStyle} className="flex-col">
                      <p className="mb-5 text-center px-4">
                        Turn horizontal and adjust quality for best experience.
                      </p>
                      <YouTube videoId="uPnIlL025Lw" opts={opts} />
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
