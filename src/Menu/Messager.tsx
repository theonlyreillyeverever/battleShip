
import { useContext, useCallback ,useEffect, useState } from "react";
import { AuthContext, AuthProvider } from "/Users/patrick/React_Projects/BattleShipReact/battle-ship-js/src/firebase/Auth";
import firebase from "firebase";
import { BrowserRouter as Router, Route, Switch,Link } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Back from "../Pages/Back"

    const Message = () => {
        type Message = {
            id: string, 
            to : string,
            room : string,
            message: string,
            from: string,
            timestamp : string
        }

        const [messages, setMessages] = useState<Message[]>([]);
        const {user}  = useContext<any>(AuthContext);

        useEffect(() => {
            firebase.database().ref("Messages")
            .on("value" , snap => {
                const messsages : Message[] = [];
                snap.forEach(e => {
                    if(e.val().to === user.uid){
                    const messsage : Message ={
                        id: e.key,
                        ...e.val()
                    }
                    messsages.push(messsage);
                 }
                })
                setMessages([...messsages])
            })
        }, [user.uid])



        if(messages === []){
            return(
                <h3>No messages</h3>
            )
        }

        return (
            <div className={"app-body"}>
            <Back/>
            {messages.map((m : Message, index : number) => {
           
                    return(

             
                            <div className={"room-obj"} key={index}>
                                           <Link onClick={
                            () => {
                                firebase.database().ref("Messages/"+m.id)
                                .set(null);
                            }
                        } key={index} to={"/game/"+m.room}>
                                {m.room}
                                </Link>
                            </div>
                       

               
                    )
                    
            })}
            </div>
        )
    }

    export default Message;