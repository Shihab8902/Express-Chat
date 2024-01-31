import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from '../Firebase/firebase.config';


export const UserContext = createContext(null);

const AuthProvider = ({ children }) => {

    //States
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);



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
        return signOut(auth)
    }


    //User state observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {

            if (currentUser && currentUser?.emailVerified) {
                setUser(currentUser);
                setLoading(false);
            } else {
                setUser(null);
                setLoading(true);
            }

        });


        return () => {
            unsubscribe()
        };

    }, []);


    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        logOutUser
    }




    return <UserContext.Provider value={authInfo}>
        {children}
    </UserContext.Provider>


}

export default AuthProvider

AuthProvider.propTypes = {
    children: PropTypes.node
}