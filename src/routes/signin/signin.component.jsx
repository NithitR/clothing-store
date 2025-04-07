
import {signInWithGooglePopup,createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils.js';
import SignUpFormComponent from "../../component/sign-up-form/sign-up-form.component.jsx";

const SignIn = () =>{

    const logOnGoogleUser = async ()=>{
       const response = await signInWithGooglePopup();
        console.log("Logged in...",response);
        await createUserDocumentFromAuth(response);
    }

    return (
        <div>
            <h1 className="signin"> Sign in </h1>
            <button onClick={logOnGoogleUser}>Sign in with Google Popups</button>
            <SignUpFormComponent/>
        </div>

    )
}

export default SignIn;