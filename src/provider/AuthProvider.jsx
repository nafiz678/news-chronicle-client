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
    const [isSubscribe, setIsSubscribe] = useState(true)
    
    const axiosPublic = useAxiosPublic()


    const provider = new GoogleAuthProvider();

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const signin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUser = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser?.email) {
                setUser(currentUser)
                setIsSubscribe(true)
                console.log(isSubscribe)
                const userInfo = { email: currentUser.email, }
                // get token and store client
                axiosPublic.post("/jwt", userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem("access-token", res.data.token)
                            setLoading(false)
                        }
                    })

                const checkingFunction = async () => {

                    const { data } = await axiosPublic.get(`/all-users-user/${currentUser?.email}`)
                    if(data?.role === "user") return setIsSubscribe(false)
                    if (data?.premiumTaken) {
                        const premiumTakenDate = new Date(data?.premiumTaken);

                        if (premiumTakenDate < new Date()) {
                            const { data } = await axiosPublic.patch(`/update-user-basic/${currentUser.email}`)
                            // console.log(data)
                            if (data.modifiedCount) {
                                setIsSubscribe(false)                            }
                        } else {
                            // console.log("Premium Taken Date is in the future.", premiumTakenDate);
                        }
                    } else {
                        // console.log("Premium Taken Date is undefined or null.");
                    }
                }

                checkingFunction()

            } else {
                setUser(currentUser)
                //todo: clear cookie by calling logout api(if token stored in client side)
                localStorage.removeItem("access-token")
                setLoading(false)
                setIsSubscribe(false)
            }
        })

        return () => {
            return unsubscribe();
        }
    }, [axiosPublic])

    const authInfo = {
        user,
        loading,
        createUser,
        signin,
        logOut,
        updateUser,
        setUser,
        googleSignIn,
        setLoading,
        isSubscribe,
        setIsSubscribe,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider

