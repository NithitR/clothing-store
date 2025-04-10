import {createContext, useState,useEffect} from "react";
import {createUserDocumentFromAuth, onAuthStateChangedListener} from "../utils/firebase/firebase.utils.js";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})

export const UserProvider = ({ children }) => {
    const [currentUser,setCurrentUser] = useState(null);
    const value = {currentUser,setCurrentUser};

    useEffect(() => {
       const unSubscribe = onAuthStateChangedListener(async (user)=>{
            console.log('observer : ',user);
           if(user){
               await createUserDocumentFromAuth(user);
           }
            setCurrentUser(user);
        });
       return unSubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}