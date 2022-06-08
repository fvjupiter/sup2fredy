import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, serverTimestamp, collection, getDoc, getDocs } from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function writeComment({ name, comment, folder, folder2 }){
    const newRef = doc(collection(db, 'comments', folder, folder2))
    await setDoc(newRef, {
        name: name,
        comment: comment,
        createdAt: serverTimestamp()
    }).catch((error) => console.log("could not write...", error))
}

export async function getComments({ folder, folder2, callback }){
    const querySnapshot = await getDocs(collection(db, 'comments', folder, folder2));
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        callback(folder, folder2, doc.id, doc.data())
    });
}
