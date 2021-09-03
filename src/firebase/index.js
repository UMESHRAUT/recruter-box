import firebase from "firebase/compat";
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyC5E65-QHOTVnJcjM6dJcGZqMpyGcMbtWQ",
  authDomain: "resume-uploader-324819.firebaseapp.com",
  projectId: "resume-uploader-324819",
  storageBucket: "resume-uploader-324819.appspot.com",
  messagingSenderId: "943936136485",
  appId: "1:943936136485:web:4feb5f233254283ad326cc"
};

firebase.initializeApp(config);

const storage =firebase.storage();

export { storage, firebase as default };

