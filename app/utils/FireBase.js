import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD26ru646SKjxI1_E1pwnckzlOrDxhtyY0",
  authDomain: "deliveryv1.firebaseapp.com",
  databaseURL: "https://deliveryv1.firebaseio.com",
  projectId: "deliveryv1",
  storageBucket: "deliveryv1.appspot.com",
  messagingSenderId: "828753087757",
  appId: "1:828753087757:web:79596009e8e5743e39b444",
  measurementId: "G-W0T3CFJ0BQ"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
