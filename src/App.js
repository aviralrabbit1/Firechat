import './App.css';
import firebase from 'firebase/compat/app';
import "https://www.gstatic.com/firebasejs/7.19.0/firebase-app.js";
import { firestore } from "https://www.gstatic.com/firebasejs/7.19.0/firebase-firestore.js";
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";


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
const app = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// firebase.initializeApp({firebaseConfig});

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
        Firechat app
      </header>
      <section>
        {user ? <ChatRoom/>: <SignIn/> }
      </section>
    </div>
  );
}

function SignIn() {
  const SignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    // auth.signInWithPopup(provider);
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

    signInWithRedirect(auth, provider);
  }
  return (
    <button onClick={SignInWithGoogle}>Sign In With Google</button>
  )  
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={()=> auth.SignOut()}>Sign Out</button>
  )  
}

function ChatRoom(){
  const messsageRef = firestore.collection('messages');
  const query = messsageRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  return(
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div>
      <form>
        <input type="text" />
        <button type='submit'></button>
      </form>
    </>
  )
}

function ChatMessage(props){
  const { text, uid, photoURL} = props.message;
  const messageClass = (uid === auth.currentUser.uid)? 'sent':'received';

  return (
    <div className={`message ${messageClass}`} >
      <img src={photoURL} alt="" />
      <p> {text} </p>
    </div>
  )
}

export default App;
