import React from 'react'
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './styles/VideoCard.css'
import '../solid_black.png'


const VideoCard = ({elem}) => {

  const navigate = useNavigate(); 
  const  _handleGotoVideoPage = () =>{
    navigate(`/video/${elem.id}`);
  }
  const getBuffer=()=>{
    const superBuffer = new Blob(elem.blobBuffer, {type: 'video/webm'});
    return window.URL.createObjectURL(superBuffer)
  }

  return (
    <Card className='VideoCard'>
      <CardActionArea onClick={_handleGotoVideoPage}>
        {!elem.answered?<CardMedia className='cardSrc' component="img" height="300" width="220" image={require("../solid_black.png")}/>
        :<CardMedia className='cardSrc' component="video" height="280" width="220" image={getBuffer()} autoPlay loop={true} muted={true}/>}
        
        <CardContent>
         <Typography variant="body2" color="text.secondary">
            PREGUNTA: {elem.question}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default VideoCard
