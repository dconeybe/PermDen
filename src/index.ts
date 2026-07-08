import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore, doc, onSnapshot, setLogLevel } from "firebase/firestore";

import { firebaseConfig } from "./firebase_config";

const display = document.getElementById("textSpan");

function log(message: string) {
  if (!display) {
    throw new Error("internal error d33vqdc34e: display not found");
  }
  display.textContent += message + "\n";
}

async function runTest(): Promise<void> {
  log("Test Started!");

  log("initializeApp()");
  const app = initializeApp(firebaseConfig);

  log("getAuth()");
  const auth = getAuth(app);

  let snapshotListenerRegistered = false;

  auth.onAuthStateChanged((user) => {
    log(`onAuthStateChanged() callback called with user: ${user?.uid}`);

    if (user && !snapshotListenerRegistered) {
      log("getFirestore()");
      const firestore = getFirestore(app);

      setLogLevel("debug");

      log("onSnapshot()");
      const document = doc(firestore, "foo/bar");
      onSnapshot(document, {
        next(snapshot) {
          log(`snapshotListener.next(): snapshot=${snapshot.ref.path}`);
        },
        error(e) {
          log(`snapshotListener.error(): e=${e.message}`);
        },
        complete() {
          log(`snapshotListener.complete()`);
        },
      });

      snapshotListenerRegistered = true;
    }
  });

  log("signInAnonymously()");
  await signInAnonymously(auth);
  log("signInAnonymously() completed");
}

const button = document.getElementById("btnRunTest");
if (!button) {
  throw new Error("internal error fpza3g7f8z: button not found");
}

let testRunning = false;

button.addEventListener("click", () => {
  if (!testRunning) {
    testRunning = true;
    runTest();
  }
});
