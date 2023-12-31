import logo from './logo.svg';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
// import { initializeApp } from "firebase/app";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";


// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDR6T5sw3kOcY4_n6RhfivJcSqDmEgLDrQ",
  authDomain: "firechat-9dcca.firebaseapp.com",
  projectId: "firechat-9dcca",
  storageBucket: "firechat-9dcca.appspot.com",
  messagingSenderId: "834551340934",
  appId: "1:834551340934:web:9484442fdd576f1a495607",
  measurementId: "G-36N8PHSEQ6"
};
// initializing the app
const analytics = getAnalytics(initializeApp(firebaseConfig));
firebase.initializeApp({firebaseConfig});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Firechat app
      </header>
    </div>
  );
}

export default App;
