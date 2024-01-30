"use client";
import { useEffect, useState } from "react";
import Auth from "./components/pages/auth/Auth";
import Main from "./components/pages/main/Main";
import Onboard from "./components/pages/onboarding/OnboardScreen";
import Splash from "./components/pages/splash/Splash";
import Subscription from "./components/pages/subscription/Subscription";
import useMainStore from "./stores/mainStore";
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useSearchParams } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Home() {
  const {
    currentScreen,
    setCurrentScreen,
    setMainScreen,
    setSubscriptionModalOpen,
    setShowEmailModal,
    setBodyBackground,
    setOnboardScreen,
    setCode,
    user,
    setUser,
  } = useMainStore();
  const searchParams = useSearchParams();
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userLocal) => {
      setTimeout(() => {
        setAuthLoaded(true);
        if (userLocal && userLocal.emailVerified) {
          const redirect = searchParams.get("redirect");
          const code = searchParams.get("code");
          if (code) setCode(code);
          if (redirect === "stripeLink") {
            setCurrentScreen(4);
            setMainScreen(2);
            setSubscriptionModalOpen(false);
          } else if (redirect === "paymentLink") {
            setCurrentScreen(4);
            setMainScreen(1);
          } else if (redirect === "success") {
            setCurrentScreen(4);
            setMainScreen(1);
          } else {
            setCurrentScreen(4);
          }
        } else if (userLocal && !userLocal.emailVerified) {
          setCurrentScreen(2);
          setShowEmailModal(true);
          setBodyBackground("#F2D1DC");
          waitForEmailVerification(userLocal);
        } else {
          setCurrentScreen(1);
          setOnboardScreen(1);
          setShowEmailModal(false);
        }
      }, 500);
    });

    return () => unsubscribe();
  }, []);

  const waitForEmailVerification = (user) => {
    const interval = setInterval(async () => {
      try {
        await user.reload();
        if (user.emailVerified) {
          clearInterval(interval);
          await createUserDocument(user.uid, user.email);
          setCurrentScreen(4);
        }
      } catch (error) {
        console.log(error);
      }
    }, 3000);
  };

  const createUserDocument = async (userId, userEmail) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const docSnap = await getDoc(userDocRef);

      if (!docSnap.exists()) {
        await setDoc(userDocRef, {
          userId,
          userEmail: userEmail.toLowerCase(),
          tokens: 0,
          affiliateCode: null,
          subscription: false,
          stripeAccountId: null,
          accountEnabled: false,
          amountSpent: 0,
          inputTokens: 0,
          outputTokens: 0,
          totalSubscribers: 0,
        });
      } else {
      }
    } catch (error) {
      alert(
        "Uh oh, there was an error while trying to create your user profile."
      );
    }
  };

  if (!authLoaded) {
    return <Splash />;
  }

  return (
    <>
      {currentScreen == 1 && <Onboard />}
      {currentScreen == 2 && <Auth />}
      {currentScreen == 3 && <Subscription />}
      {currentScreen == 4 && <Main />}
      {currentScreen == 5 && <Splash />}
    </>
  );
}
