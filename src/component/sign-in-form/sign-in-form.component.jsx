
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    authenticateWithEmailAndPassword
} from '../../utils/firebase/firebase.utils.js';
import FormInput from "../form-input/form-input.component.jsx";
import {useState} from "react";
import Button from "../button/button.component.jsx";
import './sign-in-form.style.scss';
const defaultFormFields = {
    email: "",
    password: "",
}
const SignIn = () =>{

    const [formFields, setFormState] = useState(defaultFormFields)
    const { email, password} = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormState({...formFields, [name]: value});
    }
    const logOnGoogleUser = async ()=>{
         await signInWithGooglePopup();

    }
    const handleSubmit = async (e)=>{
        try {
            e.preventDefault();
            let {user} = await authenticateWithEmailAndPassword(formFields);
            console.log(user);
            alert('sign in successful');
            // const response = await signInWithGooglePopup();
            // console.log("Logged in...",response);
            // await createUserDocumentFromAuth(response);
            // restFormFields();
        }catch (e) {
            if(e.code === 'auth/wrong-password'){
                alert("Wrong Password")
            }
            if(e.code === 'auth/invalid-email'){
                alert("Invalid Email")
            }
            if(e.code === 'auth/user-not-found'){
                alert("no user associated with this email")
            }
            if(e.code === 'auth/invalid-credential'){
                alert("no user associated with this email")
            }
            console.error(e);
        }

    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>
                Sign in
            </span>
            <form onSubmit={handleSubmit}>
            <FormInput label="email" type="email" name="email" value={email} onChange={handleChange} required/>
            <FormInput label="Password" type="password" name="password" value={password} onChange={handleChange} required/>
            <div className="buttons-container">
                <Button type='submit'>Sign in</Button>
                <Button type='button' buttonType='google' onClick={logOnGoogleUser}>Google Sign In</Button>
            </div>
            </form>
        </div>

    )
}

export default SignIn;