import { RouteComponentProps } from "react-router-dom";
import Back from "../Pages/Back"
import firebase from "firebase"
import { useContext, useCallback ,useEffect, useState } from "react";
import { AuthContext, AuthProvider } from "../firebase/Auth";

type TParams = { id : string };

const FriendsDisplay = ({ match }: RouteComponentProps<TParams>) => {
    const [menu, setMenu] = useState<string>("friends");
    const [f, setF] = useState<number>(0)
    const [classTog, setClass] = useState<boolean>(true);
    const {username}  = useContext<any>(AuthContext);

    type Request = {
        id: string | null
        usernameFriend : string,
        from : string
    }


    const [Requests, setReqeust] = useState<Request[]>([]);


    const addFriend = (r : Request) => {
        const {id, usernameFriend, from} = r

        try{
            // remove
            const ref = firebase.database().ref("User/"+ match.params.id +"/messages/friend/requests/"+id)
            ref.set(null)

            //adds 
            const AddfriendToMe = firebase.database().ref("User/"+ match.params.id +"/friends")
            //AddfriendToMe.push({username: usernameFriend, id : from})
            AddfriendToMe.push({username: usernameFriend, id : from})


            const AddMeToFriend = firebase.database().ref("User/"+ from +"/friends")
            AddMeToFriend.push({username: username, id :  match.params.id })

        }
        catch(e){
            console.log(e);
        }
   
    }

    const UserProfile = ({props}:any) => {
        return(
            <div className={(classTog === true ? "no-display" : "")}>
                <div onClick={e => {setClass(true)}} className={"exit-button exit-button-inner"}
                >X</div>
                <h1>{props.username}</h1>
                {/* <div onClick={e => addFriend(props.id, "e")}>
                    Add Friend
                </div> */}
            </div>
        )
    }


    useEffect(() => {
        try{
        const ref = firebase.database().ref("User/"+ match.params.id +"/messages/friend/requests")
        ref.on("value", snap =>{
            const tmp : Request[] = []
            snap.forEach(e => {
                const tmpRe : Request = {
                    id : e.key,
                    usernameFriend : e.val().username,
                    from : e.val().from
                }
                console.log(tmpRe);

                tmp.push(tmpRe)
            })
            
            setReqeust([...tmp]);
        })
    }
    catch(e){
        console.log(e)
    }
        
        return () => {
        }
    }, [match.params.id])


    const getFreindReq = () =>{
        const ref = firebase.database().ref("User/"+ match.params.id +"/messages/friend/requests")
    }

    const getFriends = () =>{
        const ref = firebase.database().ref("User/"+ match.params.id +"/messages/friend/requests")
    }


    const RenderFriendReq = () => {


        return (
            <div>
                {Requests.length + " Friend Requests"}
                {Requests.map((r : Request, index : number) => {
                    return(
                        <div onClick={e => {addFriend(r)}} key={index}>
                            <h1>{r.from}</h1>
                        </div>
                    )
                })}
            </div>
        )
    }

    const RenderFriends = () => {

    type Friends = {
        id: string | null
        usernameFriend : string,
    }
        const [displayFriends, setDisplayFriends] = useState<Friends[]>([]);

        useEffect(() => {
            let mounted = false;

            try{
                if(!mounted){
                const ref = firebase.database().ref("User/"+ match.params.id +"/friends/")
                ref.on("value", snap => {
                    const tmpFriends : Friends[] = []
                    snap.forEach(e => {
                        const tmpFriend : Friends ={
                            id: e.val().id,
                            usernameFriend : e.val().username
                        }
                        tmpFriends.push(tmpFriend)
                    })
                    setDisplayFriends([...tmpFriends]);
                    console.log(tmpFriends)

                })
            }
            }
            catch(e){

            }
            
            return () => {
                mounted = true;
            }
        }, [])

        return (
            <div>
                {displayFriends.length + " Friends"}
                {displayFriends.map((f : Friends, index : number) => {
                    return(
                        <div key={index}>
                            <h1>{f.usernameFriend}</h1>
                        </div>
                    )
                })}
            </div>
        )
    }



    const Menu = () => {

        return (
            <div>
                <button onClick={ e => {setMenu("friends")}}>
                    Friends
                </button>
                <button onClick={ e => {setMenu("friend-req")}}>
                    Friends Request
                </button>
            </div>
        )
    }


    const StateSwitch = () => {
        switch(menu) {


                case "friends" :{
                    return(
                      <RenderFriends/>
                    
                    )
                }
                
                case "friend-req" :{
                    return(
                        <RenderFriendReq/>
                    )
                }

        }
        return (<div>no state</div>)
    }



    return (
        <div className={"app-body"}>
            <Back/>
            <div style={{position:"absolute", left:0, right:0, top : 200,margin :"auto", width: "100vw"}}>
                  <Menu/>
            </div>
            <StateSwitch/>

                
        </div>
    )
}

export default FriendsDisplay;