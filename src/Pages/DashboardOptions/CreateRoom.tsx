
import { AuthContext } from "../../firebase/Auth"
import { useContext, useState } from "react";
import firebase from "firebase";
import { Redirect } from "react-router";
import Back from "../Back"


const CreatRoom = () => {
     const [roomTitle, setRoomTitle] = useState<string>("");
     const [showError, setShowError] = useState<boolean>(false);
     const [nextState, setNextState] = useState<boolean>(false);
     const [openState, setOpenState] = useState<boolean>(false);

     const [errorMsg, setErrorMsg] = useState<string>("");
     const {user} = useContext<any>(AuthContext);


    const createRoom = () =>{
        if(roomTitle === ""){
            alert("Room title can not be blank.")
            return;
        }

        try{
        const submit = firebase.database().ref("Room/")
        submit.on("value", snap => {
            snap.forEach((e) => {
                if(e.val().title === roomTitle) { 
                    setShowError(true)
                    setErrorMsg(roomTitle + " Isn't avaiable")
                    return;}
            })
        })
        if(!showError){
            submit.push({
                creator: user.uid,
                title: roomTitle,
                open : openState
            })
            setNextState(true);
        }
    }

        catch(e){
        }
    }

    const RoomOptions = ({props} : any) => {

    const {setOpenState, openState} = props;        

        return(
            <div style={{position : "relative", width: "40vw", height: 200}}>
                <div style={{ position :"absolute", left: 0, right: 0, margin: "auto",zIndex :99, justifyContent:"center", background: "unset", alignContent: "center", alignItems: "center", height:"100%"}} className={"flex-row"}>
                    <div style={{margin: 134}} onClick={e => {setOpenState(true)}}>
                            Open
                    </div>
                    <div style={{margin: 134}} onClick={e => { setOpenState(false)}}>
                            Friends Only
                    </div>
                </div>
                <div style={{ float:"left",position :"absolute", left: (openState === true ? "0" : "50%"), width: "50%", height: 200, background: "red"}}>

                </div>
            </div>
        )
    }

    return(
        <div className={"app-body"}>
            <Back/>
            Room 
            <input onChange={e => {setRoomTitle(e.currentTarget.value)}}/>
            {showError === false ? "" : errorMsg}

{           
}

            <button onClick={e => {
  
                createRoom()}}>Submit</button>
                {!nextState ? "" : <Redirect to={"/dahsboard"}/>
}
        </div>
    )
}

export default CreatRoom