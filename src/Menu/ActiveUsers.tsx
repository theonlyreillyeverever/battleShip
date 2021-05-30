import {useEffect, useState, useRef,useContext} from "react";
import firebase from "firebase";
import Back from "../Pages/Back"
import { TIMEOUT } from "dns";
import { AuthContext, AuthProvider } from "../firebase/Auth";



const ActiveUser = () => {
    const {user, username}  = useContext<any>(AuthContext);

    type Friend = {
        username : string,
        id : string
        }

    type User ={
        id: string,
        username : string,
        friends : Friend,
        active : string
    }

    const UserDisplay = ({props} : any) => {
        const [showUser, setShowUser] = useState<boolean>(false);
        const [classTog, setClass] = useState<boolean>(true);

        const addFriend = (userId : string, usernamef: string) => {
            try{
                console.log(username)
                const ref = firebase.database().ref("User/"+ userId +"/messages/friend/requests")
                ref.push({from : user.uid, username: username})
            }
            catch(e){
                console.log(e);
            }
       
        }


        const UserProfile = ({props}:any)  => {
            const CheckFriendship = (props : any) :boolean => {
                if(props.friends === undefined){
                    return false;
                }
            const d =  Object.values(props.friends);
            const dT : Friend[] = d as any;
            for(let i=0;i<dT.length;i++){
                    if(dT[i].id === user.uid){
                        return  true;
                    }
                }
            return false
            }
            
            return(
                <div className={(classTog === true ? "no-display" : "")}>
                    <div onClick={e => {setClass(true)}} className={"exit-button exit-button-inner"}
                    >X</div>
                    <h1>{props.username}</h1>

                {CheckFriendship(props) ? "Already friends" :     <div onClick={e => 
                         addFriend(props.id, props.username)
                        
                        }>
                        Add Friend
                    </div>}

                
                </div>
            )
        }

        return(
            <div onClick={e => {
                if(classTog){
                    setClass(false)
                    return;
                }
                
            }} className={"user-container curser"}>
                    <div className={"frame" + (classTog === true ? "no-display" : "")}>
                                <UserProfile props={props}/>
                    </div>
                    <div>
                         {props.username}
                    </div>
                    <div id={"bounce"} className={props.active === true ? "online" : "offline"}>
                         <div></div>
                    </div>
            </div>
        )
    }

    const [activeUsers, setActiveUsers] = useState<User[]>([]);
    let timmer : any = useRef(null)

    useEffect(() => {
            let mounted = false;
            if(!mounted){
            const ref = firebase.database().ref("User/")
            const tmpUsers : User[] = [];
            ref.on("value", snapshot => {
                snapshot.forEach(e => {
                    if(e.val().id === user?.uid){}
                    else{
                    const tmpUser : User = {
                        ...e.val()
                    }
            
                    tmpUsers.push(tmpUser);
                    }
                })
                setActiveUsers(tmpUsers);
            })
        }
        return () => {
            mounted = true;
        }
   }, [activeUsers.length, user?.id])
    return(
        <div className={"app-body"}>
            <Back props={timmer}/>
            {activeUsers.map((u : User, index : number) => {
                return (
                        <UserDisplay key={index} props={u}/>
                )
            })}
        </div>
    )
}

export default ActiveUser;