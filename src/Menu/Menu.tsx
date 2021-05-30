import { BrowserRouter as Router, Route, Switch,Link} from "react-router-dom";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import Dashboard from "../Pages/Dashboard";
import CreateRoom from "../Pages/DashboardOptions/CreateRoom"
import FindRoom from "../Pages/DashboardOptions/FindRoom"
import Score from "../Pages/DashboardOptions/Score"
import Game from "../Pages/Game";
import GameAwait from "../Pages/gameawait";
import Messager from "./Messager";
import ActiveUsers from "./ActiveUsers"
import InboxArea from "../Pages/Inbox"
import TopBarView from "../Menu/Topbar"
import AcccountView from "../Componentss/AccountView"
import AcccountFriends from "../Componentss/Friends"

import Toggle from "../Menu/ToggleLog";


import PrivateRoute from "./PrivateRoute";
import RestrictedRoute from "./RestrictedRoute";

import {AuthProvider} from "../firebase/Auth"
import userEvent from "@testing-library/user-event";



const Menu = () => {



    return(
        <AuthProvider>
            <Router>
                    <TopBarView/>
                <Switch>

                    <PrivateRoute path="/dashboard" exact component={Dashboard}/>
                    <PrivateRoute path="/dashboard/create-room" exact component={CreateRoom}/>
                    <PrivateRoute path="/dashboard/find-room" exact component={FindRoom}/>
                    <PrivateRoute path="/dashboard/score" exact component={Score}/>
                    <PrivateRoute path="/inbox" exact component={Messager}/>
                    <PrivateRoute path="/dashboard/active-users" exact component={ActiveUsers}/>
                    <PrivateRoute path="/account/:id/user-details" exact component={AcccountView}/>
                    <PrivateRoute path="/account/:id/friends" exact component={AcccountFriends}/>

                    <PrivateRoute path="/game/:room" exact component={Game}/>
                    <PrivateRoute path="/game/:room/await" exact component={GameAwait}/>

                    <RestrictedRoute path="/" exact component={Login}/>
                    <Route path="/*" exact component={Login}/>

                </Switch>

            </Router>
        </AuthProvider>
    )
}

export default Menu;