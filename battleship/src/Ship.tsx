
import {useState} from 'react'



const Ship = ({type} : any) => {


    const [coodinates, setCordiates] = useState({x : 0, y : 0});


    return (
        <div
        
        className={"ship"+type} id={"ship"+type} onDragStart={e => {
            const shipType = ("ship"+type)
            e.dataTransfer.setData(shipType, e.currentTarget.id)

        }} draggable="true">

        </div>
    )
}

export default Ship;