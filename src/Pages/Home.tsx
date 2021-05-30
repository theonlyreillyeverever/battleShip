import firebase from "firebase";
import { useState } from "react";
import {AuthContext} from "../firebase/Auth";



const Test = ({props} :any) => {


    const db = () => {
        
        const roomid = 0;
        try{
            const ref = firebase.database().ref("Room/")
            ref.push({
                test : props
            })
        }
        catch(e){
            console.log(e);
        }
    }

    return (
        <div>
            <button
                onClick={e => {db()}}
            >
                    Clicke me
            </button>
        </div>
    )
}

const Home = () => {
    const [state, setState] = useState('');


    return(
        <h1>
            <input 
                onChange={e => {
                    setState(e.currentTarget.value)
                }}
            />
            Welcome home son.
            <Test props={state}/>
        </h1>
    )
}

export default Home;