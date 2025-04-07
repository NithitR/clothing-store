import { useState} from "react";
import {authenticateWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils.js"
import FormInput from "../form-input/form-input.component.jsx";
import Button from "../button/button.component.jsx";

import './sign-up-form.style.scss'


const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
}

const SignUpForm = () => {
    const [formFields, setFormState] = useState(defaultFormFields)
    const {displayName, email, password, confirmPassword} = formFields;

    const restFormFields = ()=>{
        setFormState(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password === confirmPassword) {
            //proceed
            try {
                let {user} = await authenticateWithEmailAndPassword(formFields);
                await createUserDocumentFromAuth(user,{displayName});
                restFormFields();
            } catch (e) {
                if(e.code === 'auth/email-already-in-use') {
                    alert(`Email already in use!`);
                }else{
                    console.error(e);
                }
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormState({...formFields, [name]: value});
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>
                Sign up with your email and password
            </span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Display Name" type="text" name="displayName" value={displayName} onChange={handleChange} required />
                <FormInput label="email" type="email" name="email" value={email} onChange={handleChange} required/>
                <FormInput label="Password" type="password" name="password" value={password} onChange={handleChange} required/>
                <FormInput label="Confirm Password" type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange} required/>

                <Button type="submit">Sign up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;