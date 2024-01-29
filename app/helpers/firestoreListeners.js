import { auth, db } from "@/firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  limit,
  startAfter,
  orderBy,
} from "firebase/firestore";

export const listenToThreads = (setThreads, loadMore, setThreadDocId) => {
  let lastVisible = null;
  let isInitialLoad = true;
  let threads = [];

  const loadThreads = (lastDoc) => {
    let q;
    if (lastDoc) {
      q = query(
        collection(db, "threads"),
        where("uid", "==", auth.currentUser.uid),
        orderBy("timestamp"),
        limit(12),
        startAfter(lastDoc)
      );
    } else {
      q = query(
        collection(db, "threads"),
        where("uid", "==", auth.currentUser.uid),
        orderBy("timestamp"),
        limit(12)
      );
    }

    onSnapshot(q, (querySnapshot) => {
      if (isInitialLoad) {
        querySnapshot.forEach((doc) => {
          let obj = doc.data();
          obj.documentId = doc.id;
          threads.push(obj);
        });
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        setThreads(threads);
        isInitialLoad = false;
      } else {
        querySnapshot.docChanges().forEach((change) => {
          let obj = change.doc.data();
          obj.documentId = change.doc.id;

          if (change.type === "added") {
            threads.push(obj);
            setThreadDocId(obj.documentId);
          } else if (change.type === "modified") {
            const index = threads.findIndex(
              (thread) => thread.documentId === obj.documentId
            );
            if (index !== -1) {
              threads[index] = obj;
            }
          } else if (change.type === "removed") {
            threads = threads.filter(
              (thread) => thread.documentId !== obj.documentId
            );
          }
        });
        setThreads([...threads]);
      }
    });
  };

  loadThreads();

  loadMore.current = () => {
    if (lastVisible) {
      loadThreads(lastVisible);
    }
  };
};
