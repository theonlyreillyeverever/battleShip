
import { BrowserRouter as Router, Route, Switch,Link} from "react-router-dom";
import { useContext, useCallback ,useEffect, useState, useRef } from "react";
import { AuthContext, AuthProvider } from "/Users/patrick/React_Projects/BattleShipReact/battle-ship-js/src/firebase/Auth";
import firebase from "firebase";
import InboxArea from "../Pages/Inbox"
import LoadingBar from "../Pages/Loading"




const TopBarView = () => {



    const {user, username}  = useContext<any>(AuthContext);
    const [displayname, setDisplayname] = useState<string>("");
    const [d, setd] = useState<number>(0);
    const [load, setLoading] = useState<boolean>(false)
    const [a, seta] = useState<string>("slide-up");
    const tl = useRef<string>("");

    useEffect(() => {
        let mounted = false;
        if(user !== null){
            setLoading(true)
        setTimeout(() => {
            if(!mounted){
                const ref = firebase.database().ref("User/"+user?.uid)
                ref.on("value", snap => {
                    //.setDisplayname(snap.val()?.username)
                })
            }
        }, 3000)
    }
    
        return () => {
            mounted = true;
        }
    }, [user])




    const MenuOptions = ({item} :any, {y} : any) => {
        //const [showMenu, setShowmenu] = useState<string>("menu-option-list slide-up");
    
    
        return(
            <div className={"menu-option-list"}>
                <Link to={"/account/"+user?.uid+"/user-details"}>Account Details</Link>
                <Link to={"/"}>Scores</Link>
                <Link to={"/account/"+user?.uid+"/friends"}>Friends</Link>
                <Link to={"/inbox"}>
                    <InboxArea props={setd}/>
                </Link>
                <button onClick={e => {
                    firebase.database().ref("User/").child(user?.uid)
                    .update({active: "false"})
                    setLoading(false)
                    firebase.auth().signOut()
                }}>Log out</button> 
            </div>
        )
    }
    

    switch(load){
        case true: {

    return (
        <div className={"account-tag"}>
            <div style={{position: "relative", zIndex :99}} onClick={e => {
                setd(0);
                if(a === "slide-up"){
                    seta("slide-down")
                }
                else{
                    seta("slide-up")
                }
        
        }} >
                {username !== "" ? username + " "  : "Account"}
                {d === 0 ? "" : d}
            </div>
            <div className={a}>
                <MenuOptions item={0} y={a}/>
            </div>
           
        </div>
    )
        }

        case false: {
            <div></div>
        }

    }
    return(
        <div></div>
    )

}

export default TopBarView;