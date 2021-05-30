import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import firebase from "firebase";
import {AuthContext} from "../firebase/Auth"




    const Inbox = ({props} : any) => {
        const {user} = useContext(AuthContext);
        const [nu, setNu] = useState<number>(0);

        useEffect(() => {
            let mounted = false;
            firebase.database().ref("Messages")
            .on("value" , snap => {
                if(snap.numChildren() > nu){
                    let num = 0;
                snap.forEach(e => {
                    if(e.val().to === user?.uid){
                        num++
                        setNu(num);
                        props(num)
                        if(!mounted){
                        }
                        
                    }
                })
            }
            return () =>{
            }
            })
    
        }, [nu, user?.uid, props])
        return(
                <div className={nu > 0 ? "inbox-message" :" "}>
                    <p>
                        Inbox {nu}
                    </p>
                </div>
        )
    }


    export default Inbox