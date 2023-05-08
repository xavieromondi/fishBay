import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgrcx7K2I9tYs7r7Ukg15GrBkQ6nlnsao",
  authDomain: "fishbay-385114.firebaseapp.com",
  databaseURL: "https://fishbay-385114-default-rtdb.firebaseio.com",
  projectId: "fishbay-385114",
  storageBucket: "fishbay-385114.appspot.com",
  messagingSenderId: "207041813487",
  appId: "1:207041813487:web:da06fd712d6307c7a6f41a",
  measurementId: "G-YQR6G3GPBY",
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);
