import { useState, useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import auth from "../firebase/config"
import {AuthContext} from "../firebase/Auth";
import Signup from "./SignUp"
import firebase from "firebase";


const Eye = () => {
    return (
        <div className={"eye"}>
                <div></div>
        </div>
    )
}




const Login = ({ history } : any) => {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<string>("password") 
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [col, setCol] = useState<string>("flex-column justify-center")

    const {user} = useContext(AuthContext);

    const handleSignup = 
    useCallback(async event => {
            event.preventDefault();
            const {email, pass} = event.target.elements;
            try{
                await auth
                .auth()
                .signInWithEmailAndPassword(email.value, pass.value);
                    
                const ref = firebase.database().ref("User/").child(user.uid)
                if(ref.child("active").equalTo("true")){
                    console.log(ref.child("active"))
                    return;
                }
                //ref.update({active: "true"})
        }
            catch(e){
            }
        },
        []
    )





    const Input = ({props} : any, title : string) => {
        return(
            <div>
                <input onChange={e => {
                        setUsername(e.currentTarget.value)
                }}/>
            </div>
        )
    }


    if(user) {
        return <Redirect to="/dashboard"/>
    }

    return (
        <div className={"flex-row justify-center align-vert"}>
                    <form className={col} onSubmit={handleSignup}>
                    <h1>Login</h1>
                        <label className={col}>
                            Email
                                <input name={"email"} onChange={e => {
                                        setUsername(e.currentTarget.value)
                                }}/>
                            </label>
                            <label className={col}>

                                      Password
                                <input name={"pass"} type={showPassword} onChange={e => {
                                        setPassword(e.currentTarget.value)
                                }}/>
                            </label>
                            <div>
                                <div onClick={e => 
                                {
                                    if(showPassword === "password")
                                    {
                                        setShowPassword("")
                                    }
                                    else{
                                        setShowPassword("password")
                                    }
                                }}>
                                    <Eye/>
                                </div>
                            </div>
                            <label>
                                <button type={"submit"}>
                                  Login
                                </button>
                        </label>
                            </form>
                </div>
    )
}



const Body = () => {
    const [toggle, setToggle] = useState<boolean>(false)
    return(
        <>
            {!toggle ? <Login/> : <Signup/>}
            <button onClick={e => {
                if(toggle){
                    setToggle(false)
                } else{
                    setToggle(true)
                }
            }}>
                {!toggle ? "Create Account" : "Login"}
            </button>
        </>
    )
}

export default withRouter(Body);