import SignInForm from "../../component/sign-in-form/sign-in-form.component.jsx";
import SignUpForm from "../../component/sign-up-form/sign-up.component.jsx";
import './authentication.style.scss'
const Authentication = () =>{
    return (
        <div className='authentication-container'>
            <SignInForm/>
            <SignUpForm/>
        </div>

    )
}

export default Authentication;