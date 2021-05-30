import { Link, Redirect, RouteComponentProps } from "react-router-dom";
import React, { useContext, useCallback, useEffect, useState } from "react";
import { AuthContext, AuthProvider } from "/Users/patrick/React_Projects/BattleShipReact/battle-ship-js/src/firebase/Auth";
import firebase from "firebase";
import Board from "./Board"
import Tag from "./Tag"
import "../Pages/board.css"
import { on } from "process";
import InboxArea from "../Pages/Inbox"
import Chat from "../Componentss/Chat";



type TParams = { room: string };



const Game = ({ match }: RouteComponentProps<TParams>) => {
    const {user} = useContext(AuthContext);

    window.addEventListener("beforeunload", (ev) => 
    {  
    ev.preventDefault();
    return ev.returnValue = 'Are you sure you want to close?';

    });

    window.addEventListener("unload",  e => {
        e.preventDefault();
        const tmp = firebase.database().ref("Room/"+ match.params.room);
        tmp.set(null);
    } )



    enum SIZE {
        ONE,
        TWO,
        THREE,
        FOUR,
        FIVE,
        NULL
    }

    const ShipIds = [0,1,2,3,4]


    type Square = {
        x: number,
        y: number,
        hit: boolean,
        hasShip: boolean
        ship: Ship
    }




    type Ship = {

        id: number,
        name: string,
        size: SIZE
        color: string
        coordinatesSelect: CoordinatesSelect | {}
        sunk: boolean
    }

    type CoordinatesSelect = {
        x: number,
        y: number
    }


    type Player = {
        id: string
    }

    type Game = {
        roomId: string,
        creator : Player | {} | string,
        plyTwo : Player | {} | string,
        turn : Player | {} | string,
    }

    type PlayerMove = {
        plyId: string,
        roomId: string, 
        x : number,
        y : number
    }

    const GameDetails : Game = { roomId : match.params.room, creator : {}, plyTwo : {}, turn : {id : ""}}
    const [board, setBoard] = useState<Square[][]>([[], []]);
    const [Game, setGame] = useState<Game>(GameDetails);
    const [roNum,setRoNum] = useState<number>(0);
    const [selctedCord, setSelectedCords] =useState<CoordinatesSelect>({x: -1, y : -1})
    const [ShipLocationsList, setShipLoctionList]= useState<Square[]>([]);
    const [selectShip, setSelectShip] = useState<number>(0);
    const [roomId, setRoomId] = useState<string>(match.params.room)
    const [gameOver, setGameOver] = useState<boolean>(false)
    const [loser, setLoser] = useState<boolean>(false);

    const Tester = ({props} :  any) => {
        const [cords, setCords] = useState<PlayerMove[]>([]);
        useEffect(() => {
            const gameCheck = firebase.database().ref("Room/"+match.params.room)
            gameCheck.on("value", snap => {
                if(snap.val()?.status === "gameover"){
                    setGameOver(true);
                }
            })             
            const ref = firebase.database().ref("Room/"+match.params.room+"/cords")
            const cordsTmp : PlayerMove[] = []
            ref.on("value", snap => {          
                    snap.forEach(e => {
                        cordsTmp.push(e.val())
                    })
                    setCords(cordsTmp)
            })
           
            if(cords.length !== 0){
                PlayerHit(cords[cords.length-1].x, cords[cords.length-1].y);
            }

        }, [cords.length])


  

        const checkAllHit = (board : Square[][]) : boolean => {
      
            let r = true;
            board[0].forEach((e : Square, index : number) => {
                if(e.hasShip && !e.hit){
                    r = false;
                    return;
                }
            })
             return r;
        }


        const PlayerHit = (x : number, y : number) =>{
            let turn = ""
            const tmp = firebase.database().ref("Room/"+ match.params.room);
            tmp.on("value",  snap =>
                {
                   turn = snap.val()?.turn
                }
            )

            const xy = x +""+ y
            const xyInt = parseInt(xy)
     
            if(board[0][xyInt].hasShip && user.uid === turn){
                const copyBoard : Square[][] = board;
                copyBoard[0][xyInt].hit = true;
                setBoard(copyBoard)
                if(checkAllHit(copyBoard)){
                        const ref = firebase.database().ref("Room/"+roomId);
                        setLoser(true)
                        ref.update({status: "gameover"})
                        setGameOver(true);
                }  
            }
            else{
            }
        }
    


        return(
            <>

                {cords.map(( pm : PlayerMove, index : number) => {
                    return(
                        <div style={{color: "white", display: "flex", flexDirection : "row", margin:5}} key={index}>
                            <div style={{minWidth : 100, textAlign: "left"}}>
                              {pm.plyId === user.uid ? "You :" : "Enemy :"}
                            </div>
                            <div style={{paddingLeft: 10}}>
                                X : {pm.x}
                            </div>
                            <div style={{paddingLeft: 10}}>
                               Y : {pm.y}
                            </div>
                        </div>
                    )
                })}

            </>
        )

    }


    useEffect(() => {
        const newSquare: Square[][] = [[], []]
        const boardLength = 10;
        for (let k = 0; k < boardLength; k++) {
            // newSquare[0].push(...board[0], {x: k, y: 0, hit: false, hasShip : false, ship : {}})
            for (let j = 0; j < boardLength; j++) {
                newSquare[0].push(...board[0], {
                    x: k, y: j, hit: false, hasShip: false, ship: {
                        id: -1, name: '', size: SIZE.NULL, color: "", coordinatesSelect: {}, sunk: false
                    }
                })
            }
        }
        setBoard(newSquare)
    }, [])
 

    useEffect(() => {

        let mounted = false;

        if(!mounted){
            try{
        const ref = firebase.database().ref("Room/").child(roomId);
        ref.update({ waiting: "false" })
        ref.update({ status: "active" })


        ref.on("value", snap => 
        {
                const newGameDetails : Game = { roomId : roomId, creator : snap.val()?.creator, plyTwo : snap.val()?.players?.plyTwo, turn : snap.val()?.creator}
                setGame(newGameDetails);         
        })

        ref.update({ turn: Game?.turn })
    }
    catch(e){
        console.log(e);
    }
    }
    return () => {
        mounted = true;
    }
    }, [roomId, Game.turn])



    const BoardGame = () => {
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
            const ShipToAdd : Ship = {id : selectShip, name : "Ship", size : SizeList[selectShip], color: ColorList[selectShip], coordinatesSelect: {x : x, y : y}, sunk : false}
            const copyBoard : Square[][] = board
            if(xyInt > copyBoard[0].length){ return ;}

            
        
            if(selectShip >= 1 && xyInt < copyBoard[0].length){
                for(let i=0;i<selectShip;i++){
                    const ShipToAdd : Ship = {id : selectShip, name : "Ship", size : SizeList[selectShip], color: ColorList[selectShip], coordinatesSelect: {x : x, y : y+i}, sunk : false}
                    if(copyBoard[0][xyInt+i] !== undefined){
                        copyBoard[0][xyInt+i].ship = ShipToAdd;
                        copyBoard[0][xyInt+i].hasShip = true;
                        shipLoction(copyBoard[0][xyInt+i])
                    }
                }
        }
        else{
            copyBoard[0][xyInt].ship = ShipToAdd;
            copyBoard[0][xyInt].hasShip = true;
            shipLoction(copyBoard[0][xyInt])

        } 
        setBoard(copyBoard)
        }
    }

  


        const Rotate = (x : number, y : number) => {
            const ColorList : string[] = ["red", "blue", "grey", "green", "black"]
            const SizeList : SIZE[] = [SIZE.ONE, SIZE.TWO, SIZE.THREE, SIZE.FOUR, SIZE.FIVE]
            const xy = StringtoInt(x, y);
            const boardCopy : Square[][] = board;
            const root = boardCopy[0][xy]
            if(xy >= 90){ return ;}
            //alert(roNum)
            switch(roNum)
            {
                case 0:{
                    if(boardCopy[0][xy] !== undefined ){
                    const id = boardCopy[0][xy].ship.id
                        for(let i=0; i<id;i++){
                            if(root.x === boardCopy[0][xy].x && root.y === boardCopy[0][xy].y && boardCopy[0][xy+i] !== undefined){
                                boardCopy[0][xy+i].ship = {
                                    id: -1, name : '', size : SIZE.NULL, color: "", coordinatesSelect : {}, sunk : false
                                };
                                boardCopy[0][xy+i].hasShip = false;
                            }else if(boardCopy[0][xy+i] !== undefined)
                            {
                                boardCopy[0][xy+i].ship = {
                                    id: -1, name : '', size : SIZE.NULL, color: "", coordinatesSelect : {}, sunk : false
                                };
                                boardCopy[0][xy+i].hasShip = false;
                            }
                        }
    
                        setBoard(boardCopy)
                    
                        let n = (xy+(10))
                        for(let i=0;i<id;i++){
                            if(i === 0 && xy < boardCopy[0].length){
                                console.log(root)
                                boardCopy[0][xy].ship = {
                                    id: id, name : 'ship', size : SizeList[id], color: ColorList[id], coordinatesSelect : {x : x, y: y}, sunk : false
                                };
                                boardCopy[0][xy].hasShip = true;
                                
                            }
                            else if(boardCopy[0][n] !== undefined){
                            console.log(n, " bro")

                            boardCopy[0][n].ship = {
                                id: id, name : 'ship', size : SizeList[id], color: ColorList[id], coordinatesSelect : {x : x, y: y+i}, sunk : false
                            };
                            boardCopy[0][n].hasShip = true;
                            n+=10;
                            }
                        }    
                 setRoNum(roNum+1)
                    }
                    break;
                    
                }
    
            case 1:{
             const id = boardCopy[0][xy].ship.id
             let n = (xy+10)
    
             for(let i=0;i<id;i++){
                
                console.log(boardCopy[0][n])
    
                if(i === 0){
                    console.log(root)
                    boardCopy[0][n].ship = {
                        id: -1, name : '', size : SIZE.NULL, color: "", coordinatesSelect : {}, sunk : false
                    };
                    boardCopy[0][n].hasShip = false;
                }
                else{
    
                console.log(boardCopy[0][n])
                boardCopy[0][n].ship = {
                    id: -1, name : '', size : SIZE.NULL, color: "", coordinatesSelect : {}, sunk : false
                };
                boardCopy[0][n].hasShip = false;
                n+=10;
                }
            }
            setBoard(boardCopy)
                 for(let i=0; i<id;i++){
                     if(root.x === boardCopy[0][xy].x && root.y === boardCopy[0][xy].y && boardCopy[0][xy+i] !== undefined){
                         boardCopy[0][xy+i].ship = {
                             id: id, name : "Ship", size : SizeList[id], color: ColorList[id], coordinatesSelect : {x : x, y : y}, sunk : false
                         };
                         boardCopy[0][xy+i].hasShip = true;
                     }else if(boardCopy[0][xy+i] !== undefined)
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
    


        const sendCords = (x: any, y: any) => {
            let turn = "";
            const tmp = firebase.database().ref("Room/"+ match.params.room);
            tmp.on("value", snap => {
               turn = snap.val()?.turn
            })
            console.log(turn);


            if(selectShip === -1 && turn === user.uid){
                const ref = firebase.database().ref("Room/"+ match.params.room +"/cords");
                ref.push({      roomId : match.params.room,
                    plyId: user.uid,
                    x: x,
                    y: y, 
                })
                console.log(Game.turn + " : " + Game.creator)

                if(turn === Game.plyTwo){
                    tmp.update({turn: Game.creator})
    
                }
                else{
                    tmp.update({turn: Game.plyTwo})
                }
            }



            
        }


        return (
            <div className="board">
                {board.map((val: Square[], index: number) => {
                    return <div key={index}>
                        {val.map((inner: Square, j: number) => {
                            if (inner.hasShip) {
                                if (inner.hit) {
                                    return (
                                        <div className={"square hit"} key={j}>
                                            <Tag x={inner.x} y={inner.y}/>
                                            <h1 className="dot bounce"  onClick={() => {
                                                setSelectedCords({x : inner.x, y : inner.y})
                                                //FindArea(inner.x, inner.y)
                                                // isHit()
                                                sendCords(inner.x, inner.y)
                                            }}>
                                                    X
                                                {/* <ShipCom props={inner.ship}/> */}
                                                <div>
                                                </div>
                                            </h1>
                                        </div>
                                    )
                                }
                                else {
                                    //  console.log(inner.ship.name)
                                    return <div className={"square " + inner.ship.color} key={j}>
                                        <Tag x={inner.x} y={inner.y}/>
                                        <h1 className="dot" onClick={() => {
                                            if(selectShip !== -1){
                                            setSelectedCords({x : inner.x, y : inner.y})
                                            Rotate(inner.x, inner.y)
                                            //setUP(inner.x.toString())
                                          
                                            }
                                            sendCords(inner.x, inner.y)
                                        }}>
                                            .
                                            {/* <ShipCom props={inner.ship}/> */}
                                        </h1>
                                    </div>
                                }

                            }
                            else {
                                return <div className="square" key={j}>
                                    <Tag x={inner.x} y={inner.y}/>
                                    <h1 className="dot" onClick={() => {
                                        
                                        setSelectedCords({x : inner.x, y : inner.y})
                                        FindArea(inner.x, inner.y)
                                        sendCords(inner.x, inner.y)


                                    }}>
                                        .
                                           </h1>
                                </div>
                            }
                        })}
                        </div>
                    })}
                    <br>
                    </br>
                    <h1>x
                </h1>
            </div>
        )
    }


    const CreateShip = () : JSX.Element => {
        return (
            <div>
                    {ShipIds.map((val : number, index : number) => {
                        if(selectShip === -1){
                        }
                        else{
                            return <button onClick={() => {setSelectShip(val)}} key={index}>{val}</button>
                        }
                    })}
            </div>
        )
    }


    const GameOverScreen = ({props} : any) =>{


        return(
            <div className={"app-body"}>
                {props ? "You loose!" : "You Won!"}
                <p>
                    Find a new Game
                </p>
                <div onClick={
                    e => {
                        firebase.database().ref("Room/"+roomId).set(null);
                    }
                }>
                    <Link to={"/"}>New Game</Link>
                </div>
            </div>
        )
    }

switch(gameOver){
    case false :{
        return (
            <div style={{ display: "flex", flexDirection: "column"}}>

                <div style={{position: "fixed", top: 0, left: 0, width: "20%", height: "80vh", color: "white", background: "black", overflowY : "scroll"}}>
                    <h1>Attacks</h1>
                    <Tester/>
                </div>
                <div>

              
                <BoardGame />
                <br>
                </br>
                <h1>Player attack</h1>
                <CreateShip/>
                    <button onClick={() => {
                        setSelectShip(-1)
                        }}> LOCK</button>
                </div>
                <Chat props={match.params.room}/>
            </div>
        )
    }

    case true :{
            return(
                <GameOverScreen props={loser}/>
            )
    }
}

}

export default Game;