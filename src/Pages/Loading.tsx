import { useEffect, useState } from "react";



const LoadingSVG = () => {

    const [loadingString, setLoadingString] = useState<string>("...")
        useEffect(() => {
            const load = setInterval(() => {
                switch(loadingString){
                    case "...": {
                        setLoadingString("")
                        break;
                    }
                    case "..": {
                        setLoadingString("...")
    
                        break;
    
                    }
                    case ".": {
                        setLoadingString("..")
    
                        break;
    
                    }
                    case "" : {
                        setLoadingString(".")
                        break;
    
                    }
                }
            }, 1000)
        
        }, [])
        


    return(
        <div style={{display : "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" , height: "100vh"}}>
        <div style={{
            position: "relative", width: "100vw", float: "left",
            height: 400
        }}>



        <svg className={"rotate-animation abs"}  width="279" height="279" viewBox="0 0 279 279" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="139.5" y="6.56416" width="188" height="188" transform="rotate(45 139.5 6.56416)" stroke="white" stroke-width="9"/>
        </svg>

        <svg className={"rotate-animation-opp abs scale-down"}  width="279" height="279" viewBox="0 0 279 279" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="139.5" y="6.56416" width="188" height="188" transform="rotate(45 139.5 6.56416)" stroke="white" stroke-width="9"/>
        </svg>
        </div>
        <div style={{
            position: "relative", width: "100vw", float: "left", color :"white"
        }}>
   
            <h2>
                Waiting for player to respond {loadingString}
            </h2>
        </div>
        
        </div>
    )
}
export default LoadingSVG;