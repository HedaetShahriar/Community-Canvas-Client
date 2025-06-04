import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth';
import auth from '../firebase/firebase.config';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Register user with email/password
    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Sign in with email/password
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Google Sign In
    const googleSignIn = () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    // Log out the current user
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    // Update user profile (name, photo)
    const updateUserProfile = (displayName, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName,
            photoURL
        });
    };

    // Track auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authData = {
        user,
        loading,
        registerUser,
        signInUser,
        googleSignIn,
        logOut,
        updateUserProfile,
        setUser,
        setLoading,
    };

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;