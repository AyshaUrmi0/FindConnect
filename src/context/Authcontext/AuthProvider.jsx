import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import auth from '../../firebase/firebase.init';
import Authcontext from '../Authcontext/Authcontext';
import axios from 'axios';

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        setLoading(true);
        return signInWithPopup(auth, provider);
    };

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth)
            .then(() => {
                setUser(null); // Clear the user state on successful logout
            })
            .finally(() => {
                setLoading(false); // Stop the loading spinner
            });
    };
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('Signed in',currentUser);
            if(currentUser?.email){
                const user={email:currentUser.email};
                axios.post('https://find-connect-server.vercel.app/jwt',user,{withCredentials:true})
                .then(res=>{
                    
                    console.log('logged in',res.data)});
                    setLoading(false);
            }
            else{
                axios.post('https://find-connect-server.vercel.app/logout',{},{withCredentials:true})
                .then(res=>{
                    console.log('logged out',res.data)});
                    setLoading(false);
            }

            
        });
        return unsubscribe;
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signOutUser,
        signInWithGoogle
    };

    return (
        <Authcontext.Provider value={authInfo}>
            {children}
        </Authcontext.Provider>
    );
};

export default AuthProvider;
