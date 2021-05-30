import Back from "../Back"
import Chat from "../../Componentss/Chat"
import { AuthContext, AuthProvider } from "../../firebase/Auth";
import { useContext, useCallback ,useEffect, useState } from "react";

const Score = () => {

    const {username}  = useContext<any>(AuthContext);

    return(
        <div className={"app-body"}>
            <Back/>
            <h1>
                {username}
            </h1>
        </div>
    )
}

export default Score;