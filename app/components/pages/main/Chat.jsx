"use client";
import { useEffect, useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { getFunctions, httpsCallable } from "firebase/functions";
import Image from "next/image";
import questions from "@/public/questions.png";
import useMainStore from "@/app/stores/mainStore";
import useThreadStore from "@/app/stores/threadStore";
import { auth } from "@/firebase";
import ReactMarkdown from "react-markdown";
import {
  List,
  CellMeasurer,
  CellMeasurerCache,
  AutoSizer,
} from "react-virtualized";
import { ClipLoader, PulseLoader } from "react-spinners";

export default function Chat() {
  const {
    user,
    setSubscriptionModalOpen,
    setSubscriptionScreen,
    setSettingsScreen,
    setSettingsModalOpen,
  } = useMainStore();

  const {
    threadMessages,
    threadId,
    threadName,
    setThreadMessages,
    setThreadId,
    setThreadDocId,
    setErrorMessage,
    setHandleRetry,
  } = useThreadStore();
  const [message, setMessage] = useState("");
  const listRef = useRef();
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);

  useEffect(() => {
    if (threadId && !newMessage) getMessages();
  }, [threadId]);

  useEffect(() => {
    scrollToBottom();
  }, [threadMessages]);

  useEffect(() => {
    const textarea = document.getElementById("growing-textarea");

    const adjustHeight = () => {
      if (message.length === 0) {
        textarea.style.height = "40px";
      } else {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
      }
    };

    textarea.addEventListener("input", adjustHeight);

    adjustHeight();

    return () => {
      textarea.removeEventListener("input", adjustHeight);
    };
  }, [message]);

  const getMessages = async () => {
    setLoading(true);
    const functions = getFunctions();
    const getMessagesFn = httpsCallable(functions, "getMessages");

    try {
      const response = await getMessagesFn({ threadId });
      const arr = response.data.data;
      const tmp = [];
      for (const obj of arr) {
        const sender = obj?.role == "user" ? "You" : "HappyParent";
        const text = obj?.content[0].text.value;
        tmp.push({ sender, text });
      }
      setThreadMessages(tmp);
    } catch (error) {
      alert(
        "Oops, we encountered an error while trying to load this chat. Please refresh the page and try again."
      );
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleMessage = async () => {
    if (messageLoading) return;
    setMessageLoading(true);
    if (!user?.subscription && user?.tokens < 400) {
      setSettingsScreen(4);
      setErrorMessage("nope");
      setSettingsModalOpen(true);
      setMessageLoading(false);
      return;
    }

    if (message.length == 0) {
      setMessageLoading(false);
      return;
    }

    const messageLocal = message;
    setMessage("");
    const functions = getFunctions();
    const handleMessageFn = httpsCallable(functions, "handleMessage");

    const newMessages = [
      ...threadMessages,
      { sender: "You", text: messageLocal },
      {
        sender: "HappyParent",
        text: message,
        loading: true,
      },
    ];
    setThreadMessages(newMessages);

    try {
      const response = await handleMessageFn({
        threadName,
        threadId,
        uid: auth.currentUser.uid,
        message: messageLocal,
      });

      if (!threadId) {
        setNewMessage(true);
        setTimeout(() => {
          setThreadId(response.data.id);
          setThreadDocId(response.data.docId);
          setTimeout(() => {
            setNewMessage(false);
          }, 500);
        }, 500);
      }

      const updatedMessages = [...newMessages];
      updatedMessages[updatedMessages.length - 1] = {
        sender: "HappyParent",
        text: response.data.res,
        loading: false,
      };
      setThreadMessages(updatedMessages);
    } catch (error) {
      const updatedMessages = threadMessages.slice(0, -2);
      setMessage(messageLocal);
      setThreadMessages(updatedMessages);
      setSettingsScreen(4);
      setErrorMessage(error.message);
      setSettingsModalOpen(true);
      setHandleRetry(handleMessage);
    }

    setMessageLoading(false);
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollToRow(threadMessages.length - 1);
      }
    }, 600);
  };

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100,
  });

  const rowRenderer = ({ index, key, style, parent }) => {
    const message = threadMessages[index];

    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div style={style} className="mb-4">
          <div style={{ height: 16 }}></div>
          <div className="text-sm font-semibold text-gray-700">
            {message.sender}:
          </div>
          <div className="p-3 rounded-lg whitespace-pre-wrap bg-white">
            {!message?.loading && <ReactMarkdown>{message.text}</ReactMarkdown>}

            {message?.loading && <PulseLoader size={20} color="#88D8DF" />}
          </div>
        </div>
      </CellMeasurer>
    );
  };
  return (
    <div className="bg-[#F2D1DC] h-full">
      <div className="h-[90%] flex flex-col items-center justify-center">
        {!user?.subscription && user?.tokens < 400 && (
          <>
            <Image
              src={questions}
              height={500}
              width={500}
              alt="img"
              className="h-14  rounded-full object-contain"
            />
            <p
              onClick={() => {
                setSubscriptionScreen(1);
                setSubscriptionModalOpen(true);
              }}
              className="mt-4 font-medium underline text-[#474747] cursor-pointer"
            >
              Subscribe for Access
            </p>
          </>
        )}

        {user?.subscription &&
          user?.tokens < 400 &&
          threadMessages.length == 0 && (
            <>
              <Image
                src={questions}
                height={500}
                width={500}
                alt="img"
                className="h-14  rounded-full object-contain"
              />
              <p
                onClick={() => {
                  alert(
                    "We are currently working on adding this as a feature. Sorry for the inconvinece."
                  );
                }}
                className="mt-4 font-medium underline text-[#474747] cursor-pointer"
              >
                Get Bonus Questions
              </p>
            </>
          )}

        {threadMessages.length == 0 && user?.tokens > 400 && !loading && (
          <Image
            src={questions}
            height={500}
            width={500}
            alt="img"
            className="h-14  rounded-full object-contain"
          />
        )}

        <div className="absolute">
          {loading && <ClipLoader size={40} color="#88D8DF" />}
        </div>

        {(user?.tokens > 400 || user?.subscription) &&
          threadMessages.length > 0 && (
            <div
              className="h-full w-full px-2 scroller lg:px-4"
              style={{ opacity: loading ? 0 : 1 }}
            >
              <AutoSizer>
                {({ width, height }) => (
                  <List
                    className="scroller"
                    ref={listRef}
                    width={width}
                    height={height}
                    deferredMeasurementCache={cache}
                    rowCount={threadMessages.length}
                    rowHeight={cache.rowHeight}
                    rowRenderer={rowRenderer}
                    overscanRowCount={3}
                  />
                )}
              </AutoSizer>
            </div>
          )}
      </div>
      <div className="h-[10%] flex relative pl-3 shadow-sm">
        <div className="relative h-full w-full">
          <textarea
            value={message}
            placeholder="message"
            onChange={(e) => setMessage(e.target.value)}
            id="growing-textarea"
            className="resize-none overflow-hidden p-2 rounded-lg border border-[#F2D1DC] bg-transparent absolute bottom-0 w-[85%] md:w-[90%] lg:w-[95%] outline-none bg-white h-10 caret-[#88D8DF]"
          ></textarea>
        </div>
        <div
          className="flex items-center justify-center w-10 h-10 bg-white rounded-full ml-3 absolute bottom-0 right-3 "
          onClick={handleMessage}
        >
          {!messageLoading && <FaArrowUp color="#88D8DF" />}
          {messageLoading && <ClipLoader color="#88D8DF" />}
        </div>
      </div>
    </div>
  );
}
