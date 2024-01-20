import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'; 
import {  createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // create user / sign up user:
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // sign in / login user:
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    // Set an authentication state observer:
    useEffect(()=> {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) =>{
            if(currentUser){
                setUser(currentUser);
                setLoading(false);
            }
            else{
                setUser(null);
                setLoading(false);
            }
        },)
        return () => unSubscribe();
    },[]);
    console.log(user);
    // update user info:
    const updateUserInfo = (name, photo) => {
        updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }
    // sign out /logout user:
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }
    // signInWithPopup:
    const logInPopup = (provider) => {
        setLoading(true)
      return  signInWithPopup(auth, provider);
    }
    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        updateUserInfo,
        signOutUser,
        logInPopup
    }
    return (
       <AuthContext.Provider value={authInfo} >
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;
AuthProvider.propTypes = {
    children: PropTypes.node
}