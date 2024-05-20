import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
if (!getApps().length) {
    initializeApp(firebaseConfig);
}

// Initialize Firebase auth
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()

export const imageStorageLink = async (file) => {
    const name = new Date().getTime() + file.name;
    const storageRef = await ref(storage, name);

    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    return url;
};
