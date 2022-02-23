// react imports
import React, { memo,useRef } from 'react'
import { useNavigate,useParams  } from "react-router-dom";

import './style.css';
// MUI imports
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// component imports
import VideoRecorder from '../../components/VideoRecorder';


const Controls = memo(({currentPage,blobStorageRef,dataQuestions,setDataQuestions,getNewData}) => {
  const navigate = useNavigate(); 
  const checkIfPrevPage = () => {
    if(currentPage===1){
      return false
    }
    else{
      return true
    }
  }
  const checkIfNextPage = ()=>{
    if(currentPage===4){

      return "Terminar"
    }
    else{
      return "Siguiente"
    }
  }

  const _handleClickPrevButton = () => {
      if(blobStorageRef.current !== ""){
        //update state if theres a blolb recording data
        const newData = getNewData()
        setDataQuestions(newData)

      }

    navigate(`/video/${currentPage-1}`);
  }

  const _handleClickNextButton = () => {
    if(checkIfNextPage()==="Terminar"){
      //check if all data is completed
      const numUncompleted = dataQuestions.filter(elem=> elem.answered===false).length;
      if(blobStorageRef.current === ""){
        //check if there's already data stored for this question
        if(dataQuestions[3].answered===true & numUncompleted===0 ){
          //send data to API
          console.log("sendind data to API:",dataQuestions)
        }
        else{
          //raise alert
          console.log("cant finish, theres questions witout answers:",dataQuestions)
        }

      }
      else{
        const newData = getNewData()
        console.log("new data:",newData)
        setDataQuestions(newData)
        if(numUncompleted===0 ){
          //send data to API
          console.log("sendind data to API:",dataQuestions)
        }
        else{
          //raise alert
          console.log("theres questions witout answers:",dataQuestions)
        }
      }
      
    }
    else{
      //saving data
      if(blobStorageRef.current !== ""){
        //update state if theres a blolb recording data
        const newData = getNewData()
        console.log("saving this: ",newData)
        setDataQuestions(newData)

      }
      navigate(`/video/${currentPage+1}`);
    }

  }
  
  return (
    <div className='Controls'>
      <Button startIcon={<ArrowBackIosIcon/>}  onClick={_handleClickPrevButton} className="back" disabled={!checkIfPrevPage()}>Atras</Button>
      <Button endIcon={<ArrowForwardIosIcon/>} onClick={_handleClickNextButton} disabled = {false} className="next"> {checkIfNextPage()}</Button>
    </div>
  )
})

const Video = ({dataQuestions,setDataQuestions}) => {
  const navigate = useNavigate(); 
  const {id} = useParams()
  const blobRef = useRef("")
  
  const getQuestByCurrentID = ()=>{
    console.log(id);
    const quest = dataQuestions[parseInt(id)-1].question;
    return quest
  }

  const getNewData = ()=>{
    const newData = dataQuestions.map((elem)=>{
      if(elem.id===parseInt(id)){
        elem.answered=true;
        elem.blobBuffer =  blobRef.current;
        blobRef.current=""
      }
      return elem
    })
    return newData;
  }

  const _handleBackButton = () => {

    if(blobRef.current !== ""){
      //update state if theres a blolb recording data
      const newData = getNewData()
      setDataQuestions(newData)

    }

    navigate('/');
  }

    return (
    <div className='Container'>
        <div>
          <Button size="medium" onClick={_handleBackButton} startIcon={<ArrowBackIosIcon />}>Back</Button>
          
        </div>
        <div className='VideoBox'>
          <Card  className="card">
            <VideoRecorder  currentPage={parseInt(id)}
                            blobStorageRef={blobRef}
                            dataQuestions = {dataQuestions}
                            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Question:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {getQuestByCurrentID()}
              </Typography>
            </CardContent>
          </Card>
        </div>
        <Controls currentPage={parseInt(id)} 
                  blobStorageRef={blobRef} 
                  dataQuestions={dataQuestions} 
                  setDataQuestions={setDataQuestions}
                  getNewData={getNewData}/>
    </div>
  )
}

export default Video