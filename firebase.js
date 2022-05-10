import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDuFkIlQvW8yqumXedRI4m3Tbzo5zYJ7cQ",
    authDomain: "lifter-web.firebaseapp.com",
    projectId: "lifter-web",
    storageBucket: "lifter-web.appspot.com",
    messagingSenderId: "807477988444",
    appId: "1:807477988444:web:e7ed9a4031ae8ba85b6a99",
    measurementId: "G-HY7DF8Q194"
  };

const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);

export const db = getFirestore();

// const colRef = collection(db, 'post');

// getDocs(colRef).then((snapshot) => {
// 	console.log(snapshot.docs);
// });