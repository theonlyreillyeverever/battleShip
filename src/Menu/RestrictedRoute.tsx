import { useContext } from "react";
import {Route, Redirect} from "react-router-dom";
import { AuthContext } from "../firebase/Auth";


/**
 * 
 * Only intendfor keeping logged in users in from the login in page/ sign up page
 * 
 * @param param0 
 * @returns 
 */
const RestrictedRoute = ( { component : RouteComponent, ...rest} : any ) => {
    const { user } = useContext<any>(AuthContext);
    return(
        <Route
        {...rest}
        render={routeProps => 
        user ? 
        (  <RouteComponent {...routeProps}/> ) : (<Redirect to={"/dashboard"}/> )
        }/>
    )
}

export default RestrictedRoute