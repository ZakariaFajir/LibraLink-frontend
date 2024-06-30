// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3DXhKUeu4l-I2aWETlLRaUijhMn2f9AQ",
  authDomain: "biblio-e4016.firebaseapp.com",
  projectId: "biblio-e4016",
  storageBucket: "biblio-e4016.appspot.com",
  messagingSenderId: "841945485793",
  appId: "1:841945485793:web:37359f0b297d3a466c82a0",
  measurementId: "G-287KFE7Z6S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const storeImage = async (file) => {
  try {
    const storage = getStorage(app);
    const storageRef = ref(storage, `${file.name}`);
    const up = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    throw error;
  }
};


