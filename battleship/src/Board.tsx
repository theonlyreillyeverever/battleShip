import Square from "./Square"
import Ship from './Ship'
import {useState} from 'react'


class HoldData {
    protected Ship : number 
    protected i : number 

    constructor(ship : number, i : number){
        this.Ship = ship
        this.i = i;
    }

    getShip() : number {
        return this.Ship
    }

    getI() : number{
        return this.i
    }

    setShip(n : number){
        this.Ship = n;
    }

    setI(n : number){
        this.i = n;
    }

}
const b = new HoldData(0,0)


//import Coordinates from "./Coordinates"
const Board = ({props} : any) : JSX.Element =>
{
    const numArray = [0,1,2,3,4,5,6,7,8,9,10]
    type ShipCord = {
        x : number, 
        y : number,
    }



    const [shipOne, setShipOne] = useState<ShipCord[]>([{x : 3, y : 3}])
    const [shipTwo, setShipTwo] = useState<ShipCord[]>([{x : 2, y : 2}, {x : 3, y: 2}])
    const [shipThree, setShipThree] = useState<ShipCord[]>([{x : 4, y : 4}, {x :5, y: 4}, {x : 6, y: 4}])
    const [seletedShip, setSelectedShip] = useState<any>(0);
    const [a, seta] = useState<any>(0);
    const [bb, setbb] = useState<any>(0);

    




    const down = (newx: number, newy : number, index: number) => {
        if(seletedShip == 0){
            console.log("err")
            setShipOne([{x : newx, y: newy}])
        }
        else if (seletedShip == 1){
            let ne : string = newx.toString();
            setShipTwo([{x : newx, y: newy}, {x : parseInt(ne)+1, y: newy}])
        }
        else if(seletedShip == 2){
            let ne : string = newx.toString();
            setShipThree([{x : newx, y: newy}, {x : parseInt(ne)+1, y: newy},{x : parseInt(ne)+2, y: newy}])
        }
    }

    const BuildCol = ({row} : any) : JSX.Element => {
        const [coli, setcoli] = useState<any>(0);


        const BuildShip = ({p} : any, {index} : any, shipIndex : any, shipType : ShipCord[], {col} : any, {rowN} : any ) => {
            if(col == shipType[shipIndex].x  && row == shipType[shipIndex].y){
            return (
                 <Ship key={p} type={1}/>
             )
            }
        }
            return (
                <div className="board-row">
                {numArray.map((letter : number, index : number) => {
                         if(numArray[index] == shipOne[0].x && row == shipOne[0].y){
                             return <div onClick={() => setSelectedShip(0)}><Ship key={index} type={1}/>
                             </div>                       
                              }
                         //<BuildShip p={index} index={1} shipIndex={0} shipType={shipOne} col={numArray[index] row={row}/>
                         if(numArray[index] == shipTwo[0].x && row == shipTwo[0].y){
                             return <div onClick={() => setSelectedShip(1)}><Ship key={index} type={2}/>
                             </div>
                         }
                          if(numArray[index] == shipTwo[1].x && row == shipTwo[1].y){
                             return <div onClick={() => setSelectedShip(1)}><Ship key={index} type={2}/>
                             </div>
                         }
                         if((numArray[index] == shipThree[0].x && row == shipThree[0].y))
                         {
                             return <div onClick={() => setSelectedShip(2)}><Ship key={index} type={3}/>
                             </div>
                         }
                          if(numArray[index] == shipThree[1].x && row == shipThree[1].y){
                             return <div onClick={() => setSelectedShip(2)}><Ship key={index} type={3}/>
                             </div>                        
                         }
                          if(numArray[index] == shipThree[2].x && row == shipThree[2].y){
                             return <div onClick={() => setSelectedShip(2)}><Ship key={index} type={3}/>
                             </div>                        
                         }
                        //{i >= allShips[ships].length ? setI(0) : setI(i)};
                
                    else{
                       // console.log(allShips[a]);

                        return <Square key={index} x={numArray[index]} y={row} p={down} />
                    }
                })}
            </div>
            )
    }

    const BuildRow = () : JSX.Element => {
        return (
            <>
                {numArray.map((rowNum : number, index : number) => {
                    return <BuildCol key={index} row={index}/>
                })}
            </>
        )
    }

    return(
        <div className="board">
            
                <BuildRow/>
                {seletedShip}
        </div>
    )
}

export default Board;