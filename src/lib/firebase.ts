import Firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

type configType = {
  apiKey: string,
  authDomain: string,
  projectId: string,
  storageBucket: string,
  messagingSenderId: string,
  appId: string
}

const config: configType = {
  apiKey: "AIzaSyD0eFyuAKw7IbRDUyDuGyrVSiOe5GMJPxQ",
  authDomain: "instagram-app-soltanov.firebaseapp.com",
  projectId: "instagram-app-soltanov",
  storageBucket: "instagram-app-soltanov.appspot.com",
  messagingSenderId: "441393648063",
  appId: "1:441393648063:web:e8d0ace383d7e0075e510a"
};

const firebase: Firebase.app.App = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export {
  firebase,
  FieldValue
};