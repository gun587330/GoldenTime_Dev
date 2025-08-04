import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBzH_vPmRMjk8oQr97UGnkpBsQw0C7nW8k",
  authDomain: "goldentime-8c265.firebaseapp.com",
  projectId: "goldentime-8c265",
  storageBucket: "goldentime-8c265.firebasestorage.app",
  messagingSenderId: "901513479691",
  appId: "1:901513479691:web:a9388369b15c3b6315290e",
  measurementId: "G-XBYZMSSC1Q"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export default app;