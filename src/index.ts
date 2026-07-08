import { initializeApp } from "firebase/app";
import { signInAnonymously, signOut } from "firebase/auth";

import { firebaseConfig } from "./firebase_config";

initializeApp(firebaseConfig);

let count: number = 0;

const button = document.getElementById("btnRunTest");
if (! button) {
  throw new Error("internal error fpza3g7f8z: button not found");
}

const display = document.getElementById("textSpan");
if (! display) {
  throw new Error("internal error d33vqdc34e: display not found");
}

async function runTest(): Promise<void> {
  if (display) {
    display.textContent = "Test running!";
  }
}

let testRunning = false;

button.addEventListener("click", () => {
  if (! testRunning) {
    testRunning = true;
    runTest();
  }
});
