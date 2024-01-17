// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import ProviderSubmit from "./components/ProviderSubmit";

const handleSubmit = ProviderSubmit();


const apiKey = process.env.REACT_APP_API_KEY;
const authDomain = process.env.REACT_APP_AUTH_DOMAIN;
const projectId = process.env.REACT_APP_ID;
const storageBucket = process.env.REACT_APP_BUCKET;
const messagingSenderId = process.env.REACT_APP_SENDER_ID;
const appId = process.env.REACT_APP_SENDER_APP_ID;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    signInWithPopup(Auth, provider)
    .then((res) => {
        handleSubmit(res)
    })
    .catch((error) => {
        console.log(error);
    });
}