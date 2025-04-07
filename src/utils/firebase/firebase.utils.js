import { initializeApp } from 'firebase/app';
import { getAuth , signInWithRedirect , signInWithPopup , GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBs1wmDIN8BI5-7af88IzBBtm6NPW5FVrA",
    authDomain: "crwn-clothing-db-d3109.firebaseapp.com",
    projectId: "crwn-clothing-db-d3109",
    storageBucket: "crwn-clothing-db-d3109.firebasestorage.app",
    messagingSenderId: "470717814138",
    appId: "1:470717814138:web:80eceeb7ef3310fa6172c3"
};

import { getFirestore , doc , getDoc ,setDoc } from 'firebase/firestore';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt : "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

export const db =getFirestore();

export const createUserDocumentFromAuth = async (userAuth)=>{
    try {
        console.log(db,userAuth.uid)
        const userDocRef = doc(db,'users',userAuth.user.uid);

        const userSnapshot = await getDoc(userDocRef);

        console.log(userDocRef,userAuth.uid,userSnapshot.exists());

        if(!userSnapshot.exists()){
            //create
            const {displayName,email} = userAuth.user;
            const createAt = new Date();
            await setDoc(userDocRef,{
                displayName,email,createAt
            })
        }
        return userDocRef;
    }catch (e) {
        console.error(e);
    }

}