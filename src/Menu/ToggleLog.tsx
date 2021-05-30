import { AuthContext } from "../firebase/Auth";
import { useContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch,Link, Redirect } from "react-router-dom";
import firebase from "firebase";


const Toggle = () => {
    const { user } = useContext<any>(AuthContext);
    

    const MenuLog = () => {
        return(
            <svg width="45" height="25" viewBox="0 0 45 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="45" height="5" fill="#FA2020"/>
            <rect width="45" height="5" fill="#FA2020"/>
            <rect width="45" height="5" fill="white"/>
            <rect y="10" width="45" height="5" fill="#FA2020"/>
            <rect y="10" width="45" height="5" fill="#FA2020"/>
            <rect y="10" width="45" height="5" fill="white"/>
            <rect y="20" width="45" height="5" fill="#FA2020"/>
            <rect y="20" width="45" height="5" fill="#FA2020"/>
            <rect y="20" width="45" height="5" fill="white"/>
</svg>

        )
    }

    const HasUser = () => {
        return(
            <>
                {/* <Link className={"menu-log"} to={"/dashboard"}>
                    <MenuLog/>
                </Link> */}


            </>
        )
    }

    const NoUser = () => {
        return(
            <div>
                <Link to={"/"}>Login</Link>
            </div>
        )
    }

    return(
        <>
            {user === null ? <NoUser/> : <HasUser/>}
        </>
    )

}

export default Toggle;