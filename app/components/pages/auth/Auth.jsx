"use client";
import { FcGoogle } from "react-icons/fc";
import { auth, db } from "@/firebase";
import {
  fetchSignInMethodsForEmail,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import useMainStore from "@/app/stores/mainStore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import EmailVerification from "../../EmailVerification";
import { ClipLoader } from "react-spinners";

export default function Auth() {
  const { setCurrentScreen, setBodyBackground } = useMainStore();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.href);
  }, []);

  function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  }

  const signInWithEmailAndPasswordFn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Invalid Password");
    }
  };

  const createUserDocument = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const docSnap = await getDoc(userDocRef);

      if (!docSnap.exists()) {
        await setDoc(userDocRef, {
          userId,
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
      }
    } catch (error) {
      alert(
        "Uh oh, there was an error while trying to create your user profile."
      );
    }
  };

  const createAccountWithEmailAndPassword = async () => {
    console.log(window.location.href);
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = response.user;
      console.log("user");
      console.log(user);

      await sendEmailVerification(user, {
        url: pathname,
      });
      console.log("email sent");
    } catch (error) {
      console.log(error.message);

      alert("Password should be at least 6 characters.");
    }

    setLoading(false);
  };

  const checkIfUserExists = async () => {
    if (!isValidEmail(email)) {
      alert("Please enter a valid email");
      return;
    }
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length == 0) {
        setUser("nouser");
      } else {
        setUser("user");
      }
    } catch (error) {}
  };

  const handleGoogleSignUp = async (e) => {
    // Handle the Google sign-up logic here

    try {
      const provider = await new GoogleAuthProvider();
      const user = await signInWithPopup(auth, provider);
      await createUserDocument(user.user.uid);
      setCurrentScreen(4);
      setBodyBackground("#fff");
    } catch (error) {}
  };

  const sendPasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert(
        `An email has been sent to ${email}. You can change your password through this link.`
      );
    } catch (error) {
      if (error.code == "auth/user-not-found") {
        alert(`Account ${email} does not exist`);
      }
    }
  };

  return (
    <div className="bg-[#F2D1DC] h-screen px-10 flex flex-col items-center max-w-2xl md:mx-auto">
      <EmailVerification />
      <h2 className="text-2xl font-semibold mt-10 md:mt-40">HappyParent</h2>
      <p className="text-lg font-normal mt-4">Parenting made easy</p>

      <div className="w-full mt-20">
        <label htmlFor="">Your email address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="w-full h-14 rounded-full border border-gray-400 mt-2 px-5 outline-none"
        />
      </div>

      {user == "user" && (
        <div className="w-full mt-2">
          <label htmlFor="">Enter Your Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full h-14 rounded-full border border-gray-400 mt-2 px-5 outline-none"
          />
          <div className="flex items-center justify-end mt-2">
            <div
              onClick={sendPasswordReset}
              className="text-sm font-medium text-indigo-900 hover:text-indigo-600"
            >
              Forgot your password?
            </div>
          </div>
        </div>
      )}

      {user == "nouser" && (
        <>
          <div className="w-full mt-2">
            <label htmlFor="">Choose Your Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full h-14 rounded-full border border-gray-400 mt-2 px-5 outline-none"
            />
          </div>
        </>
      )}

      <button
        className="h-14 mt-4 bg-[#88D8DF] w-full rounded-full font-semibold"
        onClick={
          user == ""
            ? checkIfUserExists
            : user == "nouser"
            ? createAccountWithEmailAndPassword
            : signInWithEmailAndPasswordFn
        }
      >
        {user == "" ? (
          "Continue"
        ) : user == "nouser" && !loading ? (
          "Create Account"
        ) : user == "nouser" && loading ? (
          <ClipLoader size={20} color="#F2D1DC" />
        ) : (
          "Login"
        )}
      </button>
      <div className="text-center mt-4 text-sm">
        <span>By signing up, you are agreeing to our </span>
        <a
          href={process.env.NEXT_PUBLIC_POLICY}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-900 hover:text-indigo-600"
        >
          Privacy Policy
        </a>
        <span> and </span>
        <a
          href={process.env.NEXT_PUBLIC_TOS}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-900 hover:text-indigo-600"
        >
          Terms and Conditions
        </a>
        .
      </div>
      <div className="mt-6 w-full">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-400" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 font-semibold bg-[#F2D1DC]">Or</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3">
          <div>
            <button
              onClick={handleGoogleSignUp}
              className="h-14 mt-4 bg-white w-full rounded-full font-semibold flex items-center justify-center"
            >
              <span className="sr-only">Sign in with Google</span>
              <FcGoogle className="mr-2" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
