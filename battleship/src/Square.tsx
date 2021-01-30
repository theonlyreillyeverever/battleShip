import {useState} from 'react'
import Ship from './Ship'

type Coordinates = {
    x : string,
    y : number
}


const Square = (props : any) : JSX.Element => 
{
    const [hasShip, setHasShip] = useState<boolean>(false);



    const AllowDrop = (event : any) : void =>{
        event.preventDefault()
    }

    function poo(e : any){
        props.p(e.currentTarget.id[0], e.currentTarget.id[1], 1)

    }

    const onDropEvent = (e : React.DragEvent<HTMLDivElement>) => {
       // console.log(e.currentTarget.id)
        e.preventDefault();
            if(e.dataTransfer.getData("ship3")){
                let ShipData = e.dataTransfer.getData("ship3")
                e.currentTarget.appendChild(document.getElementById(ShipData) as HTMLImageElement)
                poo(e);

            }
            else if(e.dataTransfer.getData("ship2")){
                let ShipData = e.dataTransfer.getData("ship2")
                e.currentTarget.appendChild(document.getElementById(ShipData) as HTMLImageElement)
                poo(e);

            }
            else if(e.dataTransfer.getData("ship1")){
                let ShipData = e.dataTransfer.getData("ship1")
                e.currentTarget.appendChild(document.getElementById(ShipData) as HTMLImageElement)
                poo(e);

            }

           // poo(e);
            //setHasShip(true)
    }
    

    return(
        <div  onDrop={e => onDropEvent(e)} onDragOver={event => {AllowDrop(event)}} id={props.x+""+props.y} className="square"

        >
            <div className="hit-point">

            </div>
   
        </div>
    )
} 

export default Square