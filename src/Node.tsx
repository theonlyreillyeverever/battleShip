import {useState, useEffect} from 'react';


enum Color {
    RED, BLACK
}

// type Node = {
//     Partent : Node, 
//     Left : Node, 
//     Right : Node,
//     Color : Color,
//     Key : number
// }

class Node {

    protected Parent : Node | null = null;
    protected Left : Node | null = null;
    protected Right : Node | null = null;
    protected Color : Color | undefined;
    protected Key : number | undefined;


    constructor(Partent : Node | null, Left : Node | null, Right : Node | null, Color : Color, Key : number) {
            this.Parent = Partent
            this.Left = Left;
            this.Right = Right;
            this.Color = Color;
            this.Key = Key;
    }

    returnParent = () : string =>{
        return "this.Parent;"
    }

    returnKey = () : number | undefined => {
        return this.Key;
    }

    returnLeft = () : Node | null => {
        return this.Left;
    }
}


const Tree = () => {


    useEffect(() : any => {
        let mounted = false;
        if(!mounted){
//            setF(n1.returnParent());
            mounted = true;
        }

        return () => true ;
    })
    const n6 = new Node(null, null, null, Color.BLACK, 16);
    const n5 = new Node(null, n6, null, Color.BLACK, 15);
    const n4 = new Node(null, n5, n6, Color.BLACK, 14);
    const n3 = new Node(null, n4, null, Color.BLACK, 13);
    const n2 = new Node(null, n3, n4, Color.BLACK, 11);
    const n1 = new Node(null, n2, n3, Color.BLACK, 10);
    const [f, setF] = useState<Node>(n1);

    const findKey = (nextNode : Node | null |undefined, key : number) : Node | null => {
        if(nextNode?.returnLeft === null || nextNode?.returnKey() != key){
            return findKey(nextNode?.returnLeft(), key);
        }
        if(nextNode.returnKey() === key){
            console.log("bruhh")
            return nextNode;
        }
        else{
            return findKey(nextNode.returnLeft(), key);
        }
    }

    console.log(findKey(n1, 16)?.returnKey())


    return (
        <div className="header extra">
        </div>
    )
}

export default Tree;