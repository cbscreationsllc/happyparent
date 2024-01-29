import { create } from "zustand";

const useThreadStore = create((set, get) => ({
  threadName: "New Chat",
  threadMessages: [],
  threadId: null,
  allThreads: [],
  threadDocId: null,
  threadToDelete: null,
  errorMessage: "",
  handleRetry: null,
  setThreadId: (threadId) => {
    set({ threadId });
  },
  setAllThreads: (allThreads) => {
    set({ allThreads });
  },
  setThreadName: (threadName) => {
    set({ threadName });
  },
  setThreadMessages: (threadMessages) => {
    set({ threadMessages });
  },
  setThreadDocId: (threadDocId) => {
    set({ threadDocId });
  },
  setThreadToDelete: (threadToDelete) => {
    set({ threadToDelete });
  },
  setErrorMessage: (errorMessage) => {
    set({ errorMessage });
  },
  setHandleRetry: (handleRetry) => {
    set({ handleRetry });
  },

  resetThread: () => {
    set({
      threadName: "New Chat",
      threadMessages: [],
      threadId: null,
      allThreads: [],
      threadDocId: null,
      threadToDelete: null,
      errorMessage: "",
      handleRetry: null,
    });
  },
}));

export default useThreadStore;
