
import { BrowserRouter as Router, Route, Switch,Link} from "react-router-dom";
import PrivateRoute from "../Menu/PrivateRoute";
import AccountView from "./AccountView"
import Freies from "./Friends"
import { useContext, useCallback ,useEffect, useState } from "react";
import { AuthContext, AuthProvider } from "../firebase/Auth"
import firebase from "firebase";
import Back from "../Pages/Back"

const AccountMenuView = () =>{
    const {user}  = useContext<any>(AuthContext);
    const [section, setSection] = useState<string>("main")


    return(
        <div>
            
        </div>
    )


}

export default AccountMenuView