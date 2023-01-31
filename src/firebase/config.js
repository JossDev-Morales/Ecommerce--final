import { initializeApp } from "firebase/app";
import {getStorage,ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyBIv6OyCpsHy5SWaHSBgRoUMG8RPEnEkU8",
  authDomain: "ecommerce-academlo-final.firebaseapp.com",
  projectId: "ecommerce-academlo-final",
  storageBucket: "ecommerce-academlo-final.appspot.com",
  messagingSenderId: "672474309424",
  appId: "1:672474309424:web:cd208b9531134fddd5def5"
};

const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)
export async function upload(file) {
    const storageRef=ref(storage, `avatar/${v4()}`)
    await uploadBytes(storageRef,file)
    return await getDownloadURL(storageRef)
}