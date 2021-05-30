
import { BrowserRouter as Router, Route, Switch,Link} from "react-router-dom";
import PrivateRoute from "../Menu/PrivateRoute";
import AccountView from "./AccountView"
import Freies from "./Friends"
import { useContext, useCallback ,useEffect, useState, useRef } from "react";
import { AuthContext, AuthProvider } from "../firebase/Auth"
import firebase from "firebase";
import Back from "../Pages/Back"
import userEvent from "@testing-library/user-event";


const ChatView = ({props}: any) => {
    const roomId =  props;
    const {user}  = useContext<any>(AuthContext);
    const scrollRef = useRef<any>(null);

    type Messages = {
        from: string, 
        message : string,
        timestamp : string
    }
    const [Chat, SetChat] = useState<Messages[]>([])
    const [hideChat, setHideChat] = useState<string>("show")
    const [newMsg, setNewMSG] = useState<number>(0)

    useEffect(() => {
        const ref = firebase.database().ref("Room/"+props+"/chat")
        ref.on("value", snap =>{
            const tmpMessages : Messages[] = []
            let count : number = 0;
            snap.forEach(e => {
                const tmpMsg : Messages ={
                    ...e.val()
                }
 
                tmpMessages.push(tmpMsg)
            })
            if(hideChat === "show"){
                const lng = tmpMessages.length - Chat.length ;
                setNewMSG(lng)
            }

            SetChat([...tmpMessages]);
        })

    },[Chat.length, props])

    const SmoothScrollToBottom = () => {
        scrollRef.current?.scrollIntoView({behavior : "smooth"})
    }

    useEffect(SmoothScrollToBottom, [Chat.length])


    const SendMessage = () => {
        const [msg, setMsg] = useState<string>("")

        const SendMsg = () => {
            const outGoing : Messages = {
                from : user.uid,
                message : msg,
                timestamp : new Date().getTime().toString()
            }
            firebase.database().ref("Room/"+roomId+"/chat/").push({
                from : user.uid,
                message : msg,
                timestamp : new Date().getTime().toString()
            })
        }

        return (
            <div className={"flex-row"} style={{position: "absolute", bottom: 30}}>
                <input onKeyDown={e => {
                    if(e.key === "Enter"){
                        if(msg !== ""){
                            SendMsg();
                            setMsg("")
                        }
                    }
                }} style={{width:"80%", height: 30, fontSize: "1rem"}} onChange={e => setMsg(e.currentTarget.value)} />
                <div style={{float:"left", textAlign: "center", width: "10%"}} onClick={e => {
                    if(msg !== ""){
                        SendMsg();
                        setMsg("")

                    }

                }} >Send</div>
                
            </div>
        )
            }


    return(
      <div className={"flex-row"}>
          <button
          style={{width: 10, position: "fixed", right: 0, top: 500}}
          onClick={e => {
              if(hideChat === "hide"){
                setHideChat("show")
                setNewMSG(0)
                return;

              }
              setHideChat("hide")
          }}
          >{newMsg}</button>
          

        <div className={hideChat} ref={scrollRef} style={{position: "fixed", right: 20, bottom: 20, width: 200}}>


            <div ref={scrollRef} style={{overflowY: "scroll", height : "30vh", position: "absolute", bottom: 100, width: "100%"}}>
                {Chat.map((m : Messages, index :number) => {
                    return(
                        <div ref={scrollRef} style={{margin: "auto", minWidth : "80%", background: "unset", maxWidth: 100, padding: "20px 0px", textAlign: (m.from === user.uid ? "right" : "left")}} key={index}>
                           <div style={{ background : (m.from === user.uid ?  "rgb(27 31 83)" : "rgb(83 27 27)"), overflowWrap: "break-word" ,minWidth: 100, height: "auto" ,borderRadius: 16, padding: "10px 10px"}}>
                           {m.message}
                               </div> 
                        </div>
                    )
                })}
            </div>
                
                <SendMessage/>
            </div>
  
            </div>
    )
}

export default ChatView;