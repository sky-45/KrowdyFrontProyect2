import React from 'react'
import { useLocation,useNavigate  } from "react-router-dom";
import './style.css'

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import VideoRecorder from '../../components/VideoRecorder';


const Video = (dataQuestions,setDataQuestions) => {
  const {state} = useLocation();
  
/*   state = {
    data:data,
    question:question,
    id: id
  } */

  console.log(state)
  const navigate = useNavigate(); 
  const _handleBackButton = () => {
    navigate('/');
  }

    return (
    <div className='Container'>
        <div>
          <Button size="medium" onClick={_handleBackButton} startIcon={<ArrowBackIosIcon />}>Back</Button>
        </div>
        
        <div className='VideoBox'>
          <Card  className="card">
            {/* <CardMedia
              component="img"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="green iguana"
            /> */}
            <VideoRecorder/>
            
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Question:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {state.question}
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className='Controls'>
          <Button startIcon={<ArrowBackIosIcon />} >Atras</Button>
          <Button startIcon={<ArrowForwardIosIcon />} >Siguiente</Button>
        </div>

    </div>
  )
}

export default Video