
import {useState} from "react"

type imageProp={
    id : number
    name: string
}

const imgPropArray : imageProp[] = [
    {
        id : 0,
        name: "test"
    },
    {
        id: 1,
        name: "test 2"
    },
    {
        id: 2,
        name: "test 3"
    },
    {
        id: 3,
        name: "test 4"
    },
    {
        id : 0,
        name: "test"
    },
    {
        id: 1,
        name: "test 2"
    },
    {
        id: 2,
        name: "test 3"
    },
    {
        id: 3,
        name: "test 4"
    },
    {
        id : 0,
        name: "test"
    },
    {
        id: 1,
        name: "test 2"
    },
    {
        id: 2,
        name: "test 3"
    },
    {
        id: 3,
        name: "test 4"
    },
    {
        id : 0,
        name: "test"
    },
    {
        id: 1,
        name: "test 2"
    },
    {
        id: 2,
        name: "test 3"
    },
    {
        id: 3,
        name: "test 4"
    },
    ]


const MainImage = (main: any) => {
    return (
        <div className="body">
            <div className="inner">
                {main.main}
            </div>
        </div>
    )
}

const SubImage = (update : any) =>{
    //update.setId.setId(1)
    console.log(update.id)
    return(
        <div onClick={() => {update.update.setId(update.id)}} className="img-frame">
            <h1>{update.name}</h1>
        </div>
    )
}

const SubImages = (setId : any) =>{
    let movedOver : boolean = false;
    interface moveType {
        distance : number
    }
    const moveDistance : moveType[] = [
        {
            distance: 0
        },
        {
            distance: -540
        },
        {
            distance: -1000
        }
    ]
    
    const [moveState, setMoveState] = useState(0);

    const moveOver = () =>{
        'use strict';
        if(moveState>= moveDistance.length){
            setMoveState(0);
        }
        else{
        const elm = document.querySelector<HTMLElement>('.inner-frame')!;
        elm.style.left = moveDistance[moveState].distance+"px";
        setMoveState(moveState+1);
        }
    }
    return(
        <div>
            <div className="bottom-frame">
                <button onClick={() => {moveOver()}}>D</button>
                <div className="inner-frame">
                    {imgPropArray.map((x : imageProp, i : number) => {
                        return <div key={i}>
                            <SubImage update={setId} id={x.id} name={x.name}/>
             
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}


const Test : React.FC = () => {
    const [id, setId] = useState<number>(0);
    return (
    <div className="container-image">
        <MainImage main={id} />
        <SubImages setId={setId}/>
    </div>
    )
}

export default Test