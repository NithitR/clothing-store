import {Fragment, useContext} from "react";
import {Outlet, Link} from "react-router-dom";
import Crwnlogo from "../../assets/crown.svg?react";
import {UserContext} from "../../contexts/user.context.jsx";
import './navigation.styles.scss'
import {signOutUser} from "../../utils/firebase/firebase.utils.js";

const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    console.log("nav bar : ", currentUser);
    return (
        <Fragment>
            <div className="navigation">
                <Link className='logo-container' to="/">
                    <Crwnlogo className='logo'/>
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser ? (<span className='nav-link' onClick={signOutUser}>SIGN OUT</span>) : (<Link className='nav-link' to='/auth'> Sign in </Link>)
                    }
                </div>
            </div>
            <Outlet/>
        </Fragment>)
}

export default Navigation;