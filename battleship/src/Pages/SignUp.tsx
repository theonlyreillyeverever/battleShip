import React, { useCallback, useContext, useState } from "react";
import { withRouter } from "react-router";
import auth from "../firebase/config"
import "firebase/firebase-auth"
import {AuthContext} from "../firebase/Auth"
import { Redirect } from "react-router-dom";
import SetUsername from  "./SetUsername"



const SignUp = ({ history} : any) => {
    
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [col, setCol] = useState<string>("flex-column justify-center")
    const {user} =  useContext(AuthContext)
    const handleSignup = 
    useCallback(async event => {
            event.preventDefault();
            const {email, pass} = event.target.elements;
            try{
                await auth
                .auth()
                .createUserWithEmailAndPassword(email.value, pass.value);
                setLoggedIn(true)

            }
            catch(e){
                alert(e)
            }
        },
        []
    )

//    <Redirect to={"/dashboard"}/>



    switch(loggedIn){
        case true: {
            return(
                <div className={"flex-row justify-center align-vert"}>
                    <SetUsername props={col}/>
                </div>

            )
        }
        case false: {
            return(
                <div className={"flex-row justify-center align-vert"}>

                    <form className={col} onSubmit={handleSignup}>
                    <h1>Sign Up</h1>
                        <label className={col}>
                            Email
                            <input name={"email"} type={"email"} placeholder={"email"} />
                        </label>
                        <label className={col}>
                            Password
                            <input name={"pass"} type={"password"} placeholder={"password"} />
                        </label>
                        {/* <label className={col}>
                            Confirm Password
                            <input name={"pass"} type={"password"} placeholder={"password"} />
                        </label> */}
                        <label>
                            <button type={"submit"}>
                            Sign up
                            </button>
                        </label>
                    </form>
        
                </div>
            )

        }
    }

   
}

export default withRouter(SignUp);