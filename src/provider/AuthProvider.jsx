import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { app } from "@/firebase/firebase_init";




export const AuthContext = createContext()
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()

    const provider = new GoogleAuthProvider();

    const googleSignIn = () =>{
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const signin = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () =>{
        setLoading(true)
        return signOut(auth);
    }

    const createUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUser = (info) =>{
        return updateProfile(auth.currentUser, info)
    }

    useEffect(()=>{
       const unsubscribe =  onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
            setLoading(false)
            // if(currentUser)
            // {
            //     const userInfo = {email: currentUser.email, }
            //     // get token and store client
            //     axiosPublic.post("/jwt", userInfo)
            //     .then(res=>{
            //         if(res.data.token)
            //         {
            //             localStorage.setItem("access-token", res.data.token)
            //             setLoading(false)
            //         }
            //     })

            // }else{
            //     //todo: clear cookie by calling logout api(if token stored in client side)
            //     localStorage.removeItem("access-token")
            //     setLoading(false)
            // }
        })

        return ()=>{
            return unsubscribe();
        }
    },[axiosPublic])

    const authInfo = {
        user,
        loading,
        createUser,
        signin,
        logOut,
        updateUser,
        setUser,
        googleSignIn,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider

