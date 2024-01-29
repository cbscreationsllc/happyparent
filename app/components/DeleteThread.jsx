import useMainStore from "@/app/stores/mainStore";
import { db } from "@/firebase";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import useThreadStore from "../stores/threadStore";
import { deleteDoc, doc } from "firebase/firestore";

export default function DeleteThread() {
  const [loading, setLoading] = useState(false);
  const { setSettingsModalOpen, setSettingsScreen } = useMainStore();
  const { threadToDelete, threadDocId, resetThread } = useThreadStore();

  const handleDelete = async () => {
    if (threadToDelete) {
      setLoading(true);
      const threadDocRef = doc(db, "threads", threadToDelete.documentId);

      try {
        await deleteDoc(threadDocRef);
        if (threadDocId == threadToDelete.documentId) resetThread();
        setSettingsModalOpen(false);
        setSettingsScreen(1);
      } catch (error) {
        alert(
          "Oops... Looks like we encountered an error while trying to delete this chat. Please try again."
        );
      }

      setLoading(false);
    }
  };

  return (
    <div className="mx-auto items-center">
      <div className="bg-white sm:mx-8 lg:mx-0 rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl rounded-3xl  px-2 py-4  sm:p-10">
        <div className="flex flex-col items-center mb-4">
          <p className="text-xl font-semibold">{threadToDelete.threadName}</p>
        </div>

        <p className="text-center text-sm">
          Are you sure you would like to delete this chat?
        </p>

        <div
          onClick={handleDelete}
          className="text-gray-600 border border-[#F2D1DC] mt-4 block rounded-md py-2.5 px-3.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer"
        >
          {!loading && "Delete"}
          {loading && <ClipLoader size={20} color="#F2D1DC" />}
        </div>
      </div>
    </div>
  );
}
