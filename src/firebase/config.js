import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyADCvdTbppm_eNCuXkGhaMfCGvX7l-TQj0",
  authDomain: "mini-blog-6d2b7.firebaseapp.com",
  projectId: "mini-blog-6d2b7",
  storageBucket: "mini-blog-6d2b7.appspot.com",
  messagingSenderId: "291206070866",
  appId: "1:291206070866:web:9c81a726282ffb7cf3158b"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}