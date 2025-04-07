import {signInWithGooglePopup,createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils.js';


const SignIn = () =>{
    const logOnGoogleUser = async ()=>{
       const response = await signInWithGooglePopup();
        console.log("Logged in...",response);
       const userDocRef = await createUserDocumentFromAuth(response);
    }
    return (
        <div>
            <h1 className="signin"> Sign in </h1>
            <button onClick={logOnGoogleUser}>Sign in with Google Popups</button>
        </div>
    )
}

export default SignIn;