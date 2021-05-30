import { useState } from "react"
import { Redirect } from "react-router"



const Back = ({props} : any) => {

    const [state, setState] = useState<boolean>(false)
    if(props === undefined){

    }
    else{
        clearInterval(props)
    }

    switch(state){
        case false: {
            return(
                <div onClick={e => {setState(true)}} className={"exit-button"}>
                    <p style={{padding: "0px", margin: 4}}>X</p>
                </div>
            )
        }
        case true : {
            return(
                <Redirect to={"/dashboad"}/>
            )
        }
    }

}

export default Back;