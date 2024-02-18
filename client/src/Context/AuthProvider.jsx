import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from '../Firebase/firebase.config';
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";


export const UserContext = createContext(null);

const AuthProvider = ({ children }) => {


    //States
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [preLoaderLoading, setPreLoaderLoading] = useState(true);

    //Create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }


    //Login user
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }


    //Logout user
    const logOutUser = () => {
        setLoading(true);
        localStorage.removeItem("refresh-token");
        localStorage.removeItem("session-token");
        localStorage.removeItem("expiresAt");
        return signOut(auth)
    }


    //Send password reset email
    const resetUserPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email)
    }


    //Axios
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();



    //Refresh token
    const refreshToken = localStorage.getItem("refresh-token");
    const expiresAt = JSON.parse(localStorage.getItem("expiresAt"));

    if (expiresAt && refreshToken) {
        setInterval(() => {
            axiosSecure.post("/refreshToken", { token: refreshToken })
                .then(res => {
                    localStorage.setItem("session-token", res.data?.token)
                });
        }, expiresAt * 1000 - 500 * 1000); // Refresh the token every approx 21 minutes

    }




    //User state observer
    useEffect(() => {
        //Set preloader false
        const preloaderTimer = setTimeout(() => {
            setPreLoaderLoading(false);
        }, 5000);

        const unsubscribe = onAuthStateChanged(auth, currentUser => {

            if (currentUser && currentUser?.emailVerified) {
                axiosPublic.post("/jwt", { user: currentUser?.email })
                    .then(res => {
                        if (res?.status === 200) {
                            const data = res.data;
                            localStorage.setItem("refresh-token", data?.refreshToken);
                            localStorage.setItem("session-token", data?.sessionToken);
                            localStorage.setItem("expiresAt", JSON.stringify(data?.expiresAt));
                            setUser(currentUser);
                            setLoading(false);
                            setPreLoaderLoading(false);
                        }
                    });

            } else {
                setUser(null);
                setLoading(true);
            }

        });


        return () => {
            clearTimeout(preloaderTimer);
            unsubscribe();
        };

    }, []);




    const authInfo = {
        user,
        loading,
        preLoaderLoading,
        createUser,
        loginUser,
        logOutUser,
        resetUserPassword
    }



    return <UserContext.Provider value={authInfo}>
        {children}
    </UserContext.Provider>


}

export default AuthProvider

AuthProvider.propTypes = {
    children: PropTypes.node
}