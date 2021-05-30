

import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import Back from "../Pages/Back"



type TParams = { id : string };



const AccountView = ({ match }: RouteComponentProps<TParams>) => {
    const [show, setShow] = useState<string>("user-area fade-in");

    useEffect(() => {
            setTimeout(() => {
                const tmp : string = "user-area"
                setShow(tmp);
            }, 1000)

    }, [])

    const SetUserName = () =>{

        return (
            <form onSubmit={d => {}}>
                <p>Change Username</p>
                <input/>
                <input type={"submit"}/>
                            </form>
        )

    }


    return (
        <div className={"app-body"}>
            <Back/>
            <div className={show}>
            <SetUserName/>

            </div>
        </div>
    )
}

export default AccountView;