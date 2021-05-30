import {useState, useEffect} from 'react'

  const HeaderMain = (props : any) =>{
    const limit = 720-280


    const PillButton = () => {
      return (
        <button className="pill-button">
            SubText
        </button>
      )
    }
  

  return(
    <div className="header extra">
        <div className="center">
   
            <div className="split-50 ">
                <div className="in-frame-top">
                 <h1>
                    TheOnlyReillyEver
                </h1>
              <h5>
                    This is a sub-header section 
              </h5>
                 <PillButton/>
              </div>

            <h1 className=""></h1>   
            </div>
            <div className="split-50 img-header">
                <div className="img">

                </div>
            </div>
        </div>

    </div>
  )
}

const HeaderSub = (props : any) => {
  return(
    <div className="header img-holder" >
    </div>
  )
}

const InformationMain = (props : any) => {
  const word : string[] = ['w','o','r','d','d','v','a']
  const durtation : number = 500;
  const ticks : number = word.length;
  const frame = document.getElementsByClassName('base')
  let wordLength = word.length;

  
  for(let i=0;i<frame.length;i++){
    frame[i].addEventListener('click', e => {
      frame[i].classList.add('addDownUp');
      console.log("whattt")
    })
  
   }

  const setAndRemove = (duration : number, ticks : number) => {
        let tempCount = 0;
        let timer = setInterval(() => {
          if(wordLength-tempCount <= 6 && frame[wordLength-tempCount].classList.contains('addUpDown')){
            frame[wordLength-tempCount].classList.add('stay');
            frame[wordLength-tempCount].classList.remove('addUpDown');
          }
          if(wordLength-tempCount-1 !== -1){
            frame[wordLength-tempCount-1].classList.add('addUpDown');
          }
          
        if(tempCount==ticks){
          clearInterval(timer);
          if(wordLength-tempCount-1 !== -1){
          frame[wordLength-tempCount-1].classList.add('stay');
          frame[wordLength-tempCount-1].classList.remove('addUpDown');
          }
        }
        tempCount++

        }, duration);
  }

  window.onload = () => {
    setAndRemove(durtation, ticks);
  }


  const WordAnimation = (props : any) =>
  {
    return(
      <span className='base' id={props.id}>
          {props.letter}
      </span>
    )
  }

  return(
    <div className="header info">
      <div>
        <h1>
          {word.map((x : string, i : number ) => {
          return <WordAnimation key={i} 
                  id={i} letter={x}
          />
        })}
        </h1>
        <h4>Sub header test</h4>
      </div>
    </div>
  )
}

const SecondInformation = (props : any) => {
  type Frame = {
    id : number,
    title : string,
    subText : string,
    img : string
  }

  const [frame, setFrame] = useState<Frame[]>([]);


  const FrameCon : Frame[] =[
    {
    id : 0,
    title : "Development",
    subText : "string",
    img : "string"
   },
   {
    id : 1,
    title : "Web & Design",
    subText : "string",
    img : "string"
   },
   {
    id : 2,
    title : "Music",
    subText : "string",
    img : "string"
   },
  ]

  


  const DisplayFrames = ({props}: any) => {
    return(
      <div>
        {FrameCon.map((f : Frame, index : number) => {
          return <div key={index}>
              <SingleFrameDisplay props={f}/>
          </div>
        })}
      </div>
    )
  }

  const SingleFrameDisplay = ({props}: any) => {
      return(
        <div className="frame-display">
          <div>
            {props.title}
          </div>
        </div>
      )
  }
  return(
    <div className="header info">
      <div>
        <DisplayFrames/>
      </div>
      <div className="bk-container">
          <div className="bk-frame no-bk"> </div>
          <div className="bk-frame"></div>
       </div> 
       <div className="spacer">

       </div>
        <div className="content-frame">
            <div className="split-50">
                <div className="img-container">

                </div>
            </div>
            <div className="split-50">
              Bruh
            </div>
        </div>
    </div>
  )
}


const ThirdInfomation = () => {
    return(
        <div className="frame">

        </div>
    )
}

const Home = () => {
    return (
        <div>
        <HeaderMain/>
        <div className="body-room">
         <SecondInformation/>
        </div>
        <div className="body-room">
            <ThirdInfomation/>
        </div>
        <div  className="body-room">
        </div>
    </div>
    )

}

export default Home;