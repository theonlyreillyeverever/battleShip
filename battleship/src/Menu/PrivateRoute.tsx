import { useContext } from "react";
import {Route, Redirect} from "react-router-dom";
import { AuthContext } from "../firebase/Auth";

const PrivateRoute = ( { component : RouteComponent, ...rest} : any ) => {
    const {user}  = useContext<any>(AuthContext);
    return(
        <Route
        {...rest}
        render={routeProps => 
        !!user ? 
        (  <RouteComponent {...routeProps}/> ) : (<Redirect to={"/login"}/> )
        }/>
    )
}

export default PrivateRoute