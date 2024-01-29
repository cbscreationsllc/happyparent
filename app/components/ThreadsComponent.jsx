import React, { useEffect, useState, useRef } from "react";
import { listenToThreads } from "../helpers/firestoreListeners";
import useThreadStore from "../stores/threadStore";
import useMainStore from "../stores/mainStore";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ClipLoader } from "react-spinners";
import { LockClosedIcon } from "@heroicons/react/20/solid";

const ThreadsComponent = () => {
  const [threads, setThreads] = useState([1, 2, 3, 4, 5]);
  const loadMore = useRef(null);
  const {
    setThreadName,
    setThreadId,
    setThreadMessages,
    setThreadDocId,
    setThreadToDelete,
    threadId,
  } = useThreadStore();
  const {
    setSidebarOpen,
    setSettingsModalOpen,
    setSettingsScreen,
    setMainScreen,
    user,
    setSubscriptionModalOpen,
  } = useMainStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    listenToThreads(setThreads, loadMore, setThreadDocId);
  }, []);

  const handleLoadMoreClick = () => {
    setLoading(true);
    loadMore.current && loadMore.current();
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const handleClick = (thread) => {
    if (user?.subscription || user?.tokens >= 400) {
      setMainScreen(1);
      setThreadMessages([]);
      setSidebarOpen(false);
      setThreadName(thread.threadName);
      setThreadId(thread.threadId);
      setThreadDocId(thread.documentId);
    } else {
      setSubscriptionModalOpen(true);
    }
  };

  return (
    <div>
      {threads.map((thread, index) => (
        <li
          key={index}
          onClick={() => handleClick(thread)}
          className={`flex items-center justify-between cursor-pointer thread-item ${
            threadId === thread.threadId ? "thread-item-active" : ""
          }`}
        >
          <p
            className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 pl-4"
            style={{
              color: threadId != thread.threadId ? "#374151" : "#88D8DF",
            }}
          >
            {thread.threadName}
          </p>
          <span
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(false);
              setSettingsModalOpen(true);
              setSettingsScreen(3);
              setThreadToDelete(thread);
            }}
          >
            {user?.subscription ||
              (user?.tokens >= 400 && (
                <TrashIcon className="h-5 w-5 text-red-300 mr-5" />
              ))}

            {!user?.subscription && user?.tokens < 400 && (
              <LockClosedIcon className="h-5 w-5 text-red-300 mr-5" />
            )}
          </span>
        </li>
      ))}

      {user?.subscription && (
        <button
          onClick={handleLoadMoreClick}
          className="text-center bg-[#88D8DF] w-full rounded-lg py-2 font-semibold text-gray-700 text-sm mt-4"
        >
          {!loading && "Load More Chats"}
          {loading && <ClipLoader size={20} color="#F2D1DC" />}
        </button>
      )}
    </div>
  );
};

export default ThreadsComponent;
