import React, { useContext, useState, useEffect } from "react";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export const useAuth = () => useContext( AuthContext );


export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState("loading");


    useEffect(() => {
      
        const unsubscriber = onAuthStateChanged( auth, user => {
            setCurrentUser(user);
            setLoading("idle");
        });
        
        return () => {
            unsubscriber();
        }

    }, [ setCurrentUser, setLoading ]);



    const captchaConfig = () => {
        
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              phoneLogin();
            },
            // defaultCountry: "EG"
          }, auth);
    }




    const phoneLogin = (phoneNumber) => {
    captchaConfig();
    const appVerifier = window.recaptchaVerifier;
    return signInWithPhoneNumber(auth, `+2${phoneNumber}`, appVerifier).then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
      }).catch((error) => {
        // Error; SMS not sent
        // ...
      });;
    }

    const confirmCode = (code) => {
        return window.confirmationResult.confirm(code);
    }

    const signup = (email, password) => {

        // this will return a Promise
        return createUserWithEmailAndPassword(auth, email, password);

    }

    const login = (email, password) => {
        // this will return a Promise
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        // this will return a Promise
        return signOut(auth);
    }
    

    const value = {
        currentUser,
        signup,
        login,
        logout,
        phoneLogin,
        confirmCode
    }


    return(
        <AuthContext.Provider value = { value }>
            { loading === "idle" ? children : null }
        </AuthContext.Provider>
    );


}