import { useContext, useCallback ,useEffect, useState } from "react";
import { AuthContext, AuthProvider } from "../firebase/Auth";
import { withRouter, Redirect } from "react-router";
import LoadingSvg from "../Pages/Loading"
import firebase from "firebase";
import { RouteComponentProps } from "react-router-dom";

type TParams = { room : string };
const GameAwait = ({ match }: RouteComponentProps<TParams>) => {
    const {user} = useContext<any>(AuthContext);
    const id = match.params.room;
    const [game, setGame] = useState<string>("")
    const [secondCount, setSecondCount] = useState<number>(0);

    const addPlayer = () =>{
        const ref = firebase.database().ref("Room/").child(id);
        ref.update({players: {plyTwo : user.uid}})
    }



    useEffect(() => {
        const ref = firebase.database().ref("Room/").child(id);
        ref.update({waiting : "true"});
    }, [id])



       const timmer = setInterval(() => {
   try{
       let tmp = secondCount + 1;
        setSecondCount(tmp);
        const ref = firebase.database().ref("Room/").child(id);
        ref.on("value", snap => {
            if(snap.val()?.waiting === "false"){
                clearInterval(timmer)
                addPlayer()
                setGame("GAME")
            }
        })
    }
    catch(e){
        console.log(e);
    }
    },
    6000)
    const [creator, setCreator] = useState<string>("");

    useEffect(() => {
   try{
            const ref = firebase.database().ref("Room/").child(id);  
            ref.on("value", snap => {
                    setCreator(snap.val()?.creator)                        
                })   
            }
            catch(e){
                console.log(e)
            }
            },[id])

    useEffect(() => {
        let mounted = false;
        const msg = {
            message : "await",
            room : id,
            to : creator,
            from : user.uid,
            type : "room-request"
        }
        if(!mounted){
            const ref = firebase.database().ref("Messages/");
            ref.push(msg);
            return () => {
                mounted = true;
            }
    }
    }, [creator,id, user.uid])

            if(game !== ""){
                return (
                    <Redirect to={"/game/"+id}/>

                )
            }

    if(secondCount <= 1){
        return (
            <div>
                <LoadingSvg/>
            </div>
        )
    }
    else{
        return (
            <div style={{height: "100vh"}}>
                <h1 style={{color: "white"}}>
                    Error Timeout, try again later
                </h1>
            </div>
        )
    }
}


export default GameAwait