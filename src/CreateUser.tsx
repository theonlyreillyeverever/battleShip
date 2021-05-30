import { useState } from 'react';


const CreateUser = () => {

    type User = {
        _id : string,
        user: string,
        emailAdd : string,
        pass : string        
    }

    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirm, setConfirm] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [user, setUser] = useState<User[]>([])

    const checkUsernameAvaliable = () : boolean => {


        return false;
    }

    const checkIfNull = (value : string) : boolean => {
        if(value.length === 0 && value === ""){
            alert("empty")
            return true;
        }
        return false;
    }

    const checkIfNotMatch = () : boolean => {
        if(password.length < confirm.length || confirm.length < password.length){
            alert("bee")
            return true;
        }
        if(password.length === confirm.length){
            alert("verr")
            for(let charIndex = 0; charIndex < password.length; ++charIndex){
                if(password[charIndex] != confirm[charIndex]){
                    console.log(password[charIndex] + " != " + confirm[charIndex])
                    alert("wegotem")
                    return true;
                }
            }
        }

            return false;   
    }

    const toggleShowPasswordClick = (index : number) : void => {
        const enEle = document.getElementsByClassName('en');
        if(showPassword){
            enEle.item(index)?.removeAttribute("type");
            enEle.item(index)?.setAttribute("type","password");
            setShowPassword(false);
        }
        else{
            enEle.item(index)?.removeAttribute("type");
            enEle.item(index)?.setAttribute("type","text");
            setShowPassword(true);
        }
      }
    

    const FormSubmitDate = (e: any) => {
        e.preventDefault();
        if(checkIfNull(username)){ return;}
        if(checkIfNull(email)){ return;}
        if(checkIfNull(password)){ return;}
        if(checkIfNull(confirm)){return;}
        if(checkIfNotMatch()){return;}
        else{
            const userInformation = {
                user : username,
                emailAdd : email,
                pass : password

            }
            fetch('/user/create', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userInformation })
              })
              .then(res => {return res.json()})
              .then(data => console.log(data));
            }
        }

    


    return (
        <div className="header extra">
            <div>
                <form onSubmit={e => FormSubmitDate(e)}>
                    <input onChange={e => setUsername(e.target.value)} />
                    <input type="email" onChange={e => setEmail(e.target.value)} />
                    <input className="en" type="password" onChange={e => setPassword(e.target.value)} />
                    <input type="password" onChange={e => setConfirm(e.target.value)} />
                    <input onClick={() => toggleShowPasswordClick(0)}type="checkbox"/>
                    <input type={"submit"} />
                </form>
                    <button onClick={() => {
                        fetch('/getAll')
                        .then(res => {return res.json()})
                        .then(data => setUser(data));
                    }}>test</button>
            </div>
            {user.map((val, index : number) => {
                return<div key={index}> {val.user} </div>
            })}
        </div>
    )
}

export default CreateUser;