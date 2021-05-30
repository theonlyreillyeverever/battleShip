import React, {useEffect, useState, useRef, useCallback, useContext} from "react";
import firebase from "firebase";
import Back from "../Pages/Back"
import { Redirect } from "react-router-dom";
import { AuthContext, AuthProvider } from "../firebase/Auth";

const SetUsername = ({props} : any) => {
    const [usernameSET, SetUsernameSet] = useState<boolean>(false)
    const {user} = useContext(AuthContext);
    const [input, setInput] = useState<string>("")

    const col = props;
    const handleSignup = 
    useCallback(async event => {
            event.preventDefault();
            if(input === ""){
                alert("Username can't be blank")
                return;
            }

            const {usernameInput} = event.target.elements;
            try{
                let usernameUnavaible = false;
                const ref = firebase.database().ref("User/"+user.uid)

            
                    ref.set({username : input})
                


                SetUsernameSet(true)

            }
            catch(e){
                alert(e)
            }
        },
        [input, user.uid]
    )



    switch(usernameSET){
        case  true: {
            return(
                <Redirect to={"/dashboard"}/>
            )
        }
        case false: {
            return(
                <form className={col} onSubmit={handleSignup}>
                <h1>Username</h1>
                    <label className={col}>
                        Username
                        <input
                        onChange={e => {setInput(e.currentTarget.value)}}
                        name={"usernameInput"} type={"input"} placeholder={"Type your username"} />
                    </label>
        
                    <label>
                        <button type={"submit"}>
                            Set Username
                        </button>
                    </label>
                </form>
            )
        }
    }

}

export default SetUsername;