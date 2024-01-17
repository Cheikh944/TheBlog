// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import ProviderSubmit from "./components/ProviderSubmit";

const handleSubmit = ProviderSubmit();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmQr-CsdQNQYC8d4XGc-IESJZMTW5CTlE",
  authDomain: "the-blog-409412.firebaseapp.com",
  projectId: "the-blog-409412",
  storageBucket: "the-blog-409412.appspot.com",
  messagingSenderId: "927250426527",
  appId: "1:927250426527:web:5e6c16ada5d295d9c110aa"
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