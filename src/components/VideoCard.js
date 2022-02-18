import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from "react-router-dom";


const VideoCard = ({data,setData,question,id}) => {

  const navigate = useNavigate(); 
  const  _handleGotoVideoPage = () =>{
    
    const dataSend = {
      /* data:data,
      setData:setData,
       */
      data:data,
      question:question,
      id: id
    }
    
    navigate(`/video/${id}`, { state: dataSend });
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={_handleGotoVideoPage}>
        {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        /> */}
        <CardContent>
         <Typography variant="body2" color="text.secondary">
            {question}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default VideoCard