import { initializeApp } from "firebase/app";

import { firebaseConfig } from "./firebase_config";

initializeApp(firebaseConfig);

let count: number = 0;

const button = document.getElementById("counter-btn");
const display = document.getElementById("counter-val");

if (button && display) {
  button.addEventListener("click", () => {
    count += 1;
    display.textContent = count.toString();
  });
}
