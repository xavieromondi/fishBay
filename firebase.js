import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMpZe_PKhErZ-jQcpDqG2Z9MqI4H64Qk0",
  authDomain: "fishbay-d034d.firebaseapp.com",
  projectId: "fishbay-d034d",
  storageBucket: "fishbay-d034d.appspot.com",
  messagingSenderId: "539124641007",
  appId: "1:539124641007:web:1195f5407728f836d2ff1a",
  measurementId: "G-RSM0X6N028",
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);
