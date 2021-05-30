import {useEffect, useState, useContext} from "react";
import Back from "../Back"

import { BrowserRouter as Router, Route, Switch,Link } from "react-router-dom";
import { AuthContext } from "../../firebase/Auth"

import firebase from "firebase";

const FindRoom = () => {
    const {user} = useContext(AuthContext);
    type Rooms = {
        id: string | null,
        creator : string,
        title : string
    }
    const [rooms, setRooms] = useState<Rooms[]>([]);

    useEffect(() =>  {
        const ref = firebase.database().ref("Room/")
        ref.on("value", snapshot => {
            const tmpList : Rooms[] = []
            snapshot.forEach(e => {
                if(e.val().creator !== user.uid){
                const tmp : Rooms = {
                    id: e.key,
                    ...e.val()
                }
            
                tmpList.push(tmp)
            }
            })
            setRooms([...tmpList])
        })
    }, [])


    return(
        <div className={"app-body"}>
            <Back/>
            {rooms.map((r : Rooms, index : number) => {
                    return(

                        <div key={index} className={"room-frame"} id={r.id === null ? "" : r.id} >
                            <Link to={"/game/"+r.id+"/await"}>
                                {r.title}
                            </Link>


                        </div>
                    )
                
                
            })}
        </div>
    )
}

export default FindRoom