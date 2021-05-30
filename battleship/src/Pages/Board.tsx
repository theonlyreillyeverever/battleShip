import { type } from 'os';
import {useState, useEffect} from 'react'

//WebSocket('ws://192.168.1.20:5001/');

const Tag = ({x, y} : any) => {

    return(
        <div className="tag">
            {x}{y}
            <span>
            </span>
        </div>
    )
}

const GrowDeathPoll = () : JSX.Element => {
    const [hasGrown, setHasGrown] = useState<boolean>(false)
    let added : boolean = false;
    let flagAdded : boolean = false;

    console.log(hasGrown)


    const time = setInterval(() =>{
        if(added){
            clearInterval(time)

        }
        else{
            setHasGrown(true)
            const poll = document.getElementsByClassName("poll")
            for(let i=0;i<poll.length;i++){
                const pollitem = poll.item(i);
                pollitem?.classList.add('grow-poll')
            }
            added = true;
        }

        },500)

        const flag = setInterval(() => {
            if(flagAdded){                
                clearInterval(flag)
            }
            else{

                const poll = document.getElementsByClassName("flag")
                for(let i=0;i<poll.length;i++){
                    const pollitem = poll.item(i);
                    pollitem?.classList.add('flag-grow')
    
                }
                flagAdded = true;

            }    
             },700)   
  

    

    return (
        <div className="poll">
            <div>
                <div></div>
            </div>
            <span className="flag">

            </span>
        </div>
    )
}


const NewBoard = () : JSX.Element => {


    type Square = {
        x : number,
        y : number,
        hit : boolean,
        hasShip : boolean
        ship : Ship
    }

    type COLOR = {
        BLUE : string | undefined,
        RED : string | undefined,
        BLACK : string | undefined,
        GREY :string | undefined,
        NULL : string | undefined
    }

    enum SIZE {
        ONE,
        TWO,
        THREE,
        FOUR,
        FIVE,
        NULL
    }

    type Ship = {
        
        id: number,
        name : string,
        size : SIZE
        color : string
        coordinatesSelect : CoordinatesSelect | {}
        sunk : boolean
    }

    type CoordinatesSelect = {
        x: number,
        y : number
    }

    const [board, setBoard] = useState<Square[][]>([[],[]]);
    const [selctedCord, setSelectedCords] =useState<CoordinatesSelect>({x: -1, y : -1})
    const [previousAttacks, setpreviousAttack] =useState<CoordinatesSelect[]>([{x: -1, y : -1}])
    const [positiveHit, setPositiveHit] =useState<CoordinatesSelect[]>([{x: -1, y : -1}])
    const [ShipLocationsList, setShipLoctionList]= useState<Square[]>([]);
    const [incomingAttack, setIncomingAttack] = useState<CoordinatesSelect>({x : 0, y: 0})
    const [up, setUP]= useState<String>("")
    const [selectShip, setSelectShip] = useState<number>(0);
    const [roNum,setRoNum] = useState<number>(0);


    const BoardLength = 10;
    const ShipIds = [0,1,2,3,4]

    const [hit, setHit] = useState<boolean>(false)

    useEffect(() : any => {
    
    },[up])


    const UpdateBoard = () : void => {
            const newSquare : Square[][] = [[],[]]
            
                for(let k = 0; k <BoardLength; k++){
                   // newSquare[0].push(...board[0], {x: k, y: 0, hit: false, hasShip : false, ship : {}})
                    for(let j = 0; j <BoardLength; j++){
                        newSquare[0].push(...board[0], {x: k, y: j, hit: false, hasShip : false, ship : {
                            id: -1, name : '', size : SIZE.NULL, color: "", coordinatesSelect : {}, sunk : false
                        }})   
                    }
                }
            setBoard(newSquare)
    }

    const StringtoInt = (x : number, y : number) => {
        const xy = x +""+ y
        const xyInt = parseInt(xy)
        return xyInt
        
    }


    const FindArea = (x : number, y : number) => {

        const shipLoction = (setShip : Square) => {
            const shipLocationsCopy : Square[] = ShipLocationsList;
            shipLocationsCopy.push(...[setShip])
            setShipLoctionList(shipLocationsCopy)
            console.log(ShipLocationsList)
        }
        
        if(selectShip === -1){

        }
        else{
        const ColorList : string[] = ["red", "blue", "grey", "green", "black"]
        const SizeList : SIZE[] = [SIZE.ONE, SIZE.TWO, SIZE.THREE, SIZE.FOUR, SIZE.FIVE]

        const xy = x +""+ y
        const xyInt = parseInt(xy)
        const BoardShow = board[0][xyInt]


        const ShipToAdd : Ship = {id : selectShip, name : "Ship", size : SizeList[selectShip], color: ColorList[selectShip], coordinatesSelect: {x : x, y : y}, sunk : false}
        const copyBoard : Square[][] = board
        if(selectShip >= 1){
            for(let i=0;i<selectShip;i++){
                const ShipToAdd : Ship = {id : selectShip, name : "Ship", size : SizeList[selectShip], color: ColorList[selectShip], coordinatesSelect: {x : x, y : y+i}, sunk : false}
                copyBoard[0][xyInt+i].ship = ShipToAdd;
                copyBoard[0][xyInt+i].hasShip = true;
                shipLoction(copyBoard[0][xyInt+i])
            }
        }
        else{
            copyBoard[0][xyInt].ship = ShipToAdd;
            copyBoard[0][xyInt].hasShip = true;
            shipLoction(copyBoard[0][xyInt])

        } 
       
        setBoard(copyBoard)
        

      // console.log(board[0][xyInt])
      // console.log(board[0][xyInt+1])

        }
    }


    const Rotate = (x : number, y : number) => {
        const ColorList : string[] = ["red", "blue", "grey", "green", "black"]
        const SizeList : SIZE[] = [SIZE.ONE, SIZE.TWO, SIZE.THREE, SIZE.FOUR, SIZE.FIVE]
        const xy = StringtoInt(x, y);
        const boardCopy : Square[][] = board;
        const root = boardCopy[0][xy]
        //alert(roNum)
        switch(roNum)
        {
            case 0:{
               // console.log(boardCopy[0])
                const id = boardCopy[0][xy].ship.id
                //alert(id)
                    for(let i=0; i<id;i++){
                        if(root.x === boardCopy[0][xy].x && root.y === boardCopy[0][xy].y){
                            boardCopy[0][xy+i].ship = {
                                id: -1, name : '', size : SIZE.NULL, color: "", coordinatesSelect : {}, sunk : false
                            };
                            boardCopy[0][xy+i].hasShip = false;
                        }else
                        {
                            boardCopy[0][xy+i].ship = {
                                id: -1, name : '', size : SIZE.NULL, color: "", coordinatesSelect : {}, sunk : false
                            };
                            boardCopy[0][xy+i].hasShip = false;
                        }
                       // console.log(boardCopy[0][xy+i])
                    }

                    setBoard(boardCopy)

                    let n = (xy+10)
                    for(let i=0;i<id;i++){
                        if(i == 0){
                            console.log(root)
                            boardCopy[0][xy].ship = {
                                id: id, name : 'ship', size : SizeList[id], color: ColorList[id], coordinatesSelect : {x : x, y: y}, sunk : false
                            };
                            boardCopy[0][xy].hasShip = true;
                            
                        }
                        else{

                        
                        console.log(n)
                        boardCopy[0][n].ship = {
                            id: id, name : 'ship', size : SizeList[id], color: ColorList[id], coordinatesSelect : {x : x, y: y+i}, sunk : false
                        };
                        boardCopy[0][n].hasShip = true;
                        n+=10;
                        }
                    }

             //   console.log(boardCopy[0])
             setRoNum(roNum+1)
                break;
            }

        case 1:{
         // console.log(boardCopy[0])
         const id = boardCopy[0][xy].ship.id
         //alert("FIUCK TUMP")
         //alert(id)
         let n = (xy+10)

         for(let i=0;i<=id;i++){
            console.log(boardCopy[0][n])

            if(i == 0){
                console.log(root)
                
                boardCopy[0][n].ship = {
                    id: -1, name : '', size : SIZE.NULL, color: "", coordinatesSelect : {}, sunk : false
                };
                boardCopy[0][n].hasShip = false;
            }
            else{

            
            console.log(n)
            boardCopy[0][n].ship = {
                id: -1, name : '', size : SIZE.NULL, color: "", coordinatesSelect : {}, sunk : false
            };
            boardCopy[0][n].hasShip = false;
            n+=10;
            }
        }
        setBoard(boardCopy)


             for(let i=0; i<id;i++){
                 if(root.x === boardCopy[0][xy].x && root.y === boardCopy[0][xy].y){
                     boardCopy[0][xy+i].ship = {
                         id: id, name : "Ship", size : SizeList[id], color: ColorList[id], coordinatesSelect : {x : x, y : y}, sunk : false
                     };
                     boardCopy[0][xy+i].hasShip = true;
                 }else
                 {
                     boardCopy[0][xy+i].ship = {
                        id: id, name : "Ship", size : SizeList[id], color: ColorList[id], coordinatesSelect : {x : x, y : y+i}, sunk : false
                    };
                     boardCopy[0][xy+i].hasShip = true;
                 }
             }
            setRoNum(roNum-1)
            break;
            }
        }


        setBoard(boardCopy)
        console.log(board)
    }
    

    const SunkShip = () : boolean => {
        const shipLocationsCopy : Square[] = ShipLocationsList;
        let count = 1;
        for(let i=0;i<shipLocationsCopy.length;i++){

            const idShip = shipLocationsCopy[i].ship.id
                for(let j=0;j<shipLocationsCopy[i].ship.id;j++){

                     if(idShip === shipLocationsCopy[j].ship.id && shipLocationsCopy[j].hit){
                        shipLocationsCopy[j].ship.sunk = true;
                        console.log(shipLocationsCopy[j].ship)
                        //console.log(shipLocationsCopy[j].ship)
                        count++;
                    }

                    if(count === idShip){
                        //setShipLoctionList(shipLocationsCopy);
                       // return true;
                    }
                 
                }
        
            
        }
        
        setShipLoctionList(shipLocationsCopy);


        return true;
    }


    const Rocket = () : HTMLDivElement =>{
        const Rocket = document.createElement("div")
        Rocket.setAttribute("class","rocket")
        return Rocket
    }

    const RocketBomb = () : HTMLDivElement => {
        const Rocket = document.createElement("div")
        Rocket.setAttribute("class","rocket-bomb")
        return Rocket
    }

    const FindSquare = (x : number, y : number) =>{
        const square = document.getElementsByClassName('square')
        const xy = x+""+y
        const xyInt = parseInt(xy)
       // console.log(xyInt)
        const foundSquare = square.item(xyInt);
       // console.log(foundSquare)
        foundSquare?.appendChild(Rocket())
        let setOff : boolean = false;
        let count = 0;
        const GrowRocket = setInterval(()=> {
            switch(count){
                case 0:{
                    foundSquare?.children.item(2)?.classList.add("rocket-grow")
                    foundSquare?.children.item(2)?.appendChild(RocketBomb())

                    count++;
                    break;
                }
                case 1:{

                    foundSquare?.children.item(2)?.children.item(0)?.classList.add("bomb-grow")
                    count++;

                    break;
                }
                case 2:{

                    foundSquare?.children.item(2)?.children.item(0)?.classList.add("take-off")

                    count++;

                    break;
                }
                case 3:{
                    foundSquare?.children.item(2)?.children.item(0)?.classList.add("take-off-go")
                    break;
                }
                case 4:{
                    clearInterval(GrowRocket)
                    break;
                }
            }

        },800)


        
    }

    const AttackOtherSide = () : JSX.Element => {

        const [inputX, setInputX] = useState<string>("");
        const [inputY, setInputY] = useState<any>("");

        const message = () =>{
            
           // console.log(inputX.length)
            if(inputX.length === 0 || inputY.length === 0){
                return {id: "invalid"}
            }else{
            const x = parseInt(inputX);
            const y = parseInt(inputY);
        

            if(isNaN(x) || isNaN(y) || x >= BoardLength || y >= BoardLength || x < 0 || y < 0){
                return {id: "invalid"}
            }
            FindSquare(x, y)

        //    console.log(x + " " + y)
                return {id: "attack", x: x, y: y}
            }
        }

        return (
            <div>
                <input onChange={e => setInputX(e.target.value)}/>
                <input onChange={e => setInputY(e.target.value)}/>
                <button onClick={() => { 
            }}>Attack</button>
            </div>
        )
    }


    const CreateShip = () : JSX.Element => {
        return (
            <div>
                    {ShipIds.map((val : number, index : number)=>{
                        if(selectShip === -1){
                        }
                        else{
                            return <button onClick={() => {setSelectShip(val)}} key={index}>{val}</button>
                        }
                    })}
            </div>
        )
    }



    const AddShip = () : void => {     
        const boardLen = board[0].length;
        const xy = selctedCord.x +""+  selctedCord.y
        const xyInt = parseInt(xy)
       // console.log(xyInt)

  

            const WithinRangeHigher = (range : number, find : number, len : number) =>{
            }


            const WithinRangeLower = (range : number, find : number, len : number) =>{
        }


            const binarySearch = (ListLen : number, Cords : number) : Square | {} => {
                if(ListLen == 0){
                    return {}
                }
                
                if(Cords > ListLen/2){
                    //console.log(ListLen/2 + " Cords larger")

                    return binarySearch(ListLen/2, Cords);

                }
                else if(Cords < ListLen/2){
                   // console.log(ListLen/2 + " Cords smaller")
                    return binarySearch(ListLen/2, Cords);

                }
                return {}
            }

            binarySearch(boardLen, xyInt);

    }


    const ShipCom = ({props} : any) : JSX.Element => {
       // console.log(props.id)
        return(
            <div className="color">
                    
            </div>
        )
    }

    const RenderBoard = () : JSX.Element =>{


        return (
            <div className="board">
                {board.map((val : Square[], index : number) => {
                    return <div key={index}>
                            {val.map((inner : Square, j : number) => {
                                if(inner.hasShip){
                                    if(inner.hit){
                                        return(
                                            <div className={"square hit"} key={j}>
                                            <Tag x={inner.x} y={inner.y}/>
                                            <h1 onClick={() => {
                                                //setSelectedCords({x : inner.x, y : inner.y})
                                                //FindArea(inner.x, inner.y)
                                               // isHit()
                                                }}>
        
                                                <ShipCom props={inner.ship}/>
                                                <div>
                                                    <GrowDeathPoll/>
                                                    </div>
                                           </h1>
                                    </div>
                                        )
                                    }
                                    else{
                                      //  console.log(inner.ship.name)
                                        return <div className={"square " + inner.ship.color} key={j}>
                                            <Tag x={inner.x} y={inner.y}/>

                                        
                                        <h1 className="dot" onClick={() => {
                                            //etSelectedCords({x : inner.x, y : inner.y})
                                            Rotate(inner.x, inner.y)
                                            setUP(inner.x.toString())
                                            }}>
                                                .
                                            <ShipCom props={inner.ship}/>
                                       </h1>
                                </div>
                                    }
                 
                                }
                                else{
                                return <div className="square" key={j}> 
                                            <Tag x={inner.x} y={inner.y}/>

                                            <h1 className="dot" onClick={() => {
                                                setSelectedCords({x : inner.x, y : inner.y})
                                                FindArea(inner.x, inner.y)
                                                }}>
                                                .
                                           </h1>
                                    </div>
                                }
                            })}
                            {hit}
                            </div>
                })}
                <br>
                </br>
                <h1>
  
            


                </h1>
             {up}
            </div>
        )

    }

    const isHit = () => {
        if(hit){
            setHit(false)
        }
        else{
            setHit(true)
        }
    }



    const SetSunkShip = (shipSunk : boolean) => {
        if(shipSunk){
            console.log(ShipLocationsList)
                
        }
        else{

        }
    }

    const PlayerHit = (x : number, y : number) =>{
        const xy = x +""+ y
        const xyInt = parseInt(xy)
        console.log(xyInt)
        console.log(board[0][xyInt])
        if(board[0][xyInt].hasShip){
            const copyBoard : Square[][] = board;
            copyBoard[0][xyInt].hit = true;
            setBoard(copyBoard)
            SetSunkShip(SunkShip());

        }
        else{
         //   alert("miss")
        }
    }

    useEffect(() => {
        UpdateBoard()

    },[UpdateBoard])

    
    return (
        <div>
            <RenderBoard/>
            <br>
            </br>
            <h1>Player attack</h1>
            {incomingAttack.x +  " " + incomingAttack.y}
            <CreateShip/>
                <button onClick={() => {setSelectShip(-1)}}> LOCK</button>
                {selectShip === -1 ? <AttackOtherSide/> : ""}
        </div>
    )
}

export default NewBoard;