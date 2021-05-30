import { start } from "repl";
import {useState} from 'react'


const Canvas = () => 
{
    const [x, setX] = useState<number>(0)
    const [y, setY] = useState<number>(0)

    window.onload = () => {
        const can = document.getElementsByClassName("box")
        const item = can.item(0)
        console.log(item);

        
    }

    return (
        <div className="box-container">
                <canvas className="box"/>
        </div>
    )
}

export default Canvas;