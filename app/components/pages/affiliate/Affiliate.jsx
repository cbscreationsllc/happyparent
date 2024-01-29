"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import affiliateMarketing from "@/public/affiliate-marketing.png";
import { getFunctions, httpsCallable } from "firebase/functions";
import { auth } from "@/firebase";
import { useState } from "react";
import useMainStore from "@/app/stores/mainStore";
import { ClipLoader } from "react-spinners";
import Notification from "../../Notification";
import { ClipboardIcon } from "@heroicons/react/24/outline";

export default function Affiliate() {
  const { user } = useMainStore();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState("");

  const createStripeLink = async () => {
    if (!loading) {
      setLoading(true);
      const functions = getFunctions();
      const createStripeLinkFn = httpsCallable(functions, "createStripeLink");

      const code = user?.affiliateCode ? user.affiliateCode : null;
      const stripeId = user?.stripeAccountId ? user.stripeAccountId : null;

      try {
        const response = await createStripeLinkFn({
          uid: auth.currentUser.uid,
          code,
          stripeId,
        });

        window.location.href = response.data.link;
      } catch (error) {
        alert(
          "Oops, it seems we encounted an error while trying to generate the link. Please try again"
        );
      }
      setLoading(false);
    }
  };

  function copyToClipboardFallback(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    document.execCommand("copy");

    document.body.removeChild(textArea);
  }

  return (
    <div className="h-full bg-gradient-to-b from-[#88D8DF] to-[#F2D1DC]">
      <div className="max-w-3xl mx-auto">
        <Notification show={show} setShow={setShow} description={description} />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="md:pt-10"
        >
          <Image
            height={500}
            width={500}
            src={affiliateMarketing}
            className="h-52 w-full object-contain"
            alt="man and woman confused"
          />
        </motion.div>
        <div className="flex flex-col items-center">
          {!user?.accountEnabled && (
            <motion.button
              className="w-[70%] py-5 rounded-full bg-[#F2D1DC] font-bold"
              onClick={createStripeLink}
            >
              {!loading && "Complete Onboarding"}
              {loading && <ClipLoader size={20} color="#88D8DF" />}
            </motion.button>
          )}

          {user?.accountEnabled && (
            <>
              <h4
                onClick={async () => {
                  copyToClipboardFallback(user?.affiliateCode);
                  setDescription(
                    "Your partner code has been copied to your clipboard. Good luck!"
                  );
                  setShow(true);
                  setTimeout(() => {
                    setShow(false);
                  }, 3000);
                }}
                className="mt-4 mb-4 text-gray-700 font-bold flex items-center justify-center cursor-pointer"
              >
                Partner Code: {user?.affiliateCode}
                <span className="ml-1">
                  <ClipboardIcon
                    className="h-4 w-4 font-bold"
                    color="#374151"
                  />
                </span>
              </h4>
              <motion.button
                className="w-[70%] py-5 rounded-full bg-[#F2D1DC] font-bold mt-4 cursor-pointer"
                onClick={() =>
                  window.open(
                    "https://www.stripe.com",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                Go to Stripe Dashboard
              </motion.button>
              <motion.button
                onClick={async () => {
                  copyToClipboardFallback(
                    process.env.NEXT_PUBLIC_COPY_TO_CLIPBOARD_URL +
                      user?.affiliateCode
                  );
                  setShow(true);
                  setDescription(
                    "Your affiliate link has been copied to your clipboard. Good luck!"
                  );
                  setTimeout(() => {
                    setShow(false);
                  }, 3000);
                }}
                className="w-[70%] py-5 rounded-full bg-[#F2D1DC] font-bold mt-4"
              >
                Copy Affiliate Link
              </motion.button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
