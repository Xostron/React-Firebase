import React, { createContext } from 'react';
import ReactDOMClient from 'react-dom/client';
import App from './App';
import './index.less';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import 'firebase/firestore'
import { getStorage } from 'firebase/storage'

export const firebaseContext = createContext()

const firebaseConfig = {
    apiKey: "AIzaSyAoWSBt1joZT8XZk-Ba62XeGkrBdYcwUMQ",
    authDomain: "kanban-react-417bf.firebaseapp.com",
    projectId: "kanban-react-417bf",
    storageBucket: "kanban-react-417bf.appspot.com",
    messagingSenderId: "833511189578",
    appId: "1:833511189578:web:d4685a3216dc8baf9c0ab3",
    measurementId: "G-CJ9LSBKWSM"
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage(app)


const container = document.getElementById('root')
const root = ReactDOMClient.createRoot(container)
root.render(
    <firebaseContext.Provider
        value={{ auth, db, storage }}
    >
        <App />
    </firebaseContext.Provider>
)


