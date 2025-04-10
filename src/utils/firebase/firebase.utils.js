import {initializeApp} from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import {firebaseConfig} from '../../config';
import {doc, getDoc, getFirestore, setDoc} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Initialize Firebase
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
//deprecated
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth,provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additional = {displayName: ''}) => {
    try {

        const userDocRef = doc(db, 'users', userAuth.uid);
        const userSnapshot = await getDoc(userDocRef);

        console.log(userDocRef, userAuth.uid, userSnapshot.exists());

        if (!userSnapshot.exists()) {
            //create
            const {displayName, email} = userAuth
            const createAt = new Date();
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt,
                ...additional
            })
        }
        return userDocRef;
    } catch (e) {
        console.error(e);
    }

}

export const createFirebaseUserWithEmailAndPassword = async ({email, password}) => {
    if (!email || !password) {
        return;
    }
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const authenticateWithEmailAndPassword = async ({email, password}) => {

    return await signInWithEmailAndPassword(auth, email, password)

}

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback)