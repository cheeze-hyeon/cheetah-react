import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDz_W39ss-3RtifjYX_wxcrK87P6U58-Ao",
  authDomain: "cheetah-54f27.firebaseapp.com",
  projectId: "cheetah-54f27",
  storageBucket: "cheetah-54f27.appspot.com",
  messagingSenderId: "152855262054",
  appId: "1:152855262054:web:9dbcf78dab7a4e662e4ea7",
  measurementId: "G-6H7E7HQMK0",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
