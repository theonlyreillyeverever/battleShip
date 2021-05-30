import { stringify } from 'querystring';
import {useState, useEffect} from 'react'


 const RatingSystem = () =>{

    const updateButton = () =>{
        let rated = false;
        const frame = document.getElementsByClassName('rate');
        for(let i: number = 0; i < frame.length; i++){
            frame[i].addEventListener('mouseover', e => {
                if(!rated){
                    for(let j : number = i; j>= 0; j--){
                        frame[j].classList.add('active')
                    }
                }
            })
            frame[i].addEventListener('mouseout', e => {
                if(!rated){
                    for(let j : number = frame.length-1; j>= 0; j--){
                        frame[j].classList.remove('active')
                    }
                }
            })
            frame[i].addEventListener('click', () => {
                if(rated){
                    rated = false;
                }
                else{
                    rated = true;
                }
            })

        }
        return true;
    }

    useEffect(() : any => {
        let mounted : boolean = true;
        if(updateButton()){

        }
        return () => mounted = false;
    }, [])

    return(
        <div className="rating-frame">
            <button className="rate" >1</button>

            <button className="rate" >2</button>
            <button className="rate" >3</button>
            <button className="rate" >4</button>
            <button className="rate" >5</button>

        </div>
    )
 }

const TodoList = () =>{
    const [todo, setTodo] = useState<todoItem[]>([{ id : 0 , title : 'first', body : 'test', completed : false  }])
    const [input, setInput] = useState<any>('');
    const [body, setBody] = useState<string>('');


    interface todoItem {
        id: Number | null,
        title: string,
        body: string,
        completed : boolean
    }


    const DisplayTodoList = ({list} : any) => {
        console.log(todo)
        
        return(
            <div className="main-frame">
                {list.map((x: todoItem, i :number) => {
                    return <div key={i}>
                        <h1>
                           {x.title}
                        </h1>
                        <h5>
                            {x.body}
                        </h5>
                        {x.completed ? 'true' : 'false'}
                    <input type={'checkbox'}
                    onClick={e => {
                         let update = [...todo];
                         let index  = update.find((y) => y.id === i)?.completed
                         if(!index){
                             //alert(update.find((y) => y.id === i)?.completed);
                             update.find((y) => y.id === i)!.completed = true                        

                        }
                         else{
                            update.find((y) => y.id === i)!.completed = false                        
                     }      
                         setTodo(update);
                    }}
                    />
                    <RatingSystem/>
                    <button onClick={() =>
                        {
                            const update = [...todo];
                            const index = update.indexOf(x)
                            if(index !== -1){
                                update.splice(index, 1);
                                setTodo(update);
                            }
                        }
                    }>
                        delete
                    </button>
                    </div>
                    
                })}
            </div>
        )
    }

    return(
        <div>
            <div className="fixed-top">
                <div className="child">

               
            <input value={input} onChange={e => setInput(e.target.value)}/>
            <input value={body} onChange={e => setBody(e.target.value)}/>

            <button onClick={() => {
               // alert(todo.length)
                setTodo([...todo, {id : todo.length, title : input, body : body, completed : false}]);
                setInput('');
                setBody('');

            }}>
                submit
            </button>
            </div>
            </div>
                <div className="dynmaic-height">
                    <DisplayTodoList list={todo}/>
                </div>
        </div>
    )
}


const CommentSection = () => {
    const [count, setCount]  = useState<number>(0) 
    return(
        <div>
            <h1>
                TODO LIST
            </h1>
            <TodoList />
        </div>
    )
}

export default CommentSection;
