import {useEffect, useState, createContext } from "react";
import config from "./config"
import firebase from "firebase"
export const AuthContext = createContext<any>(null);

export const AuthProvider = ({children} : any ) => {
    const [user, setUser] = useState<any>(null);
    const [username, setUsername] = useState<string>("")

    useEffect(() => {
        config.auth().onAuthStateChanged(setUser);
        if(user !== null){
        firebase.database().ref("User/"+user.uid)
        .on("value", snap => {
            setUsername(snap.val()?.username)
        })
    }
    }, [user])

    return(
        <AuthContext.Provider value={{user, username}}>
            {children}
        </AuthContext.Provider>
    )
}

