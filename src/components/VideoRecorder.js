import React,{useEffect} from 'react'
import Button from '@mui/material/Button';
import CircleIcon from '@mui/icons-material/Circle';

import * as VideoHandlers from '../utils/VideoHandlers'
import './styles/VideoRecorder.css'


const VideoRecorder = ({currentPage,blobStorageRef,dataQuestions}) => {
    console.log("rendering videorecorder")
    let statusRecord = "start"
    let statusPlay = "play"

    let stateRecorded = dataQuestions[currentPage-1].answered
    useEffect(()=>{
        init(VideoHandlers.constraints);
        if(stateRecorded){
            //show play button 
            statusRecord = "recorded"
            document.getElementById("playVideo").style.visibility = "visible"
            document.getElementById("playVideo").textContent = VideoHandlers.renderButtonStatus(statusPlay)
            document.getElementById("showVideo").textContent = VideoHandlers.renderButtonStatus(statusRecord)
            recordedBlobs = dataQuestions[currentPage-1].blobBuffer
            
        }
        else{

            //dont show play button
            document.getElementById("playVideo").style.visibility = "hidden"
            document.getElementById("showVideo").textContent = VideoHandlers.renderButtonStatus(statusRecord)
        }
    },[currentPage])

    function setStatusRecord(val){
        statusRecord = val+""
        //change button record value
        document.getElementById("showVideo").textContent = VideoHandlers.renderButtonStatus(statusRecord)
    }
    function setStatusPlay(val){
        statusPlay = val+""
        //change button play value
        document.getElementById("playVideo").textContent = VideoHandlers.renderButtonStatus(statusPlay)
    }
    let mediaRecorder;
    let recordedBlobs;

    async function init() {
        const stream = await navigator.mediaDevices.getUserMedia(VideoHandlers.constraints);
        const liveVideo = document.querySelector('video');
        window.stream = stream;
        liveVideo.srcObject = stream;
    }


    function handleDataAvailable(event) {
        if (event.data && event.data.size > 0) {
            recordedBlobs.push(event.data);
        }
      }
    let timer,currentTime=0;
    function startRecording() {
        recordedBlobs = [];
        document.querySelector("#timeStampRecording").style.visibility = "visible"
        document.querySelector("#rcrdIcon").style.visibility = "visible"
        
        const mimeType = 'video/webm;codecs=vp9,opus';
        const options = {mimeType};
        mediaRecorder = new MediaRecorder(window.stream, options);
        mediaRecorder.onstop = (event) => {
            //setQuestionAsAnswered(currentPage)
            console.log("question set as answered")
          };
        
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.start();
        timerRecorded();
    }
    function stopRecording() {
        
        document.querySelector("#timeStampRecording").style.visibility = "hidden"
        document.querySelector("#rcrdIcon").style.visibility = "hidden"
        
        if(timer){
            clearTimeout(timer);
            currentTime=0;
        }
        mediaRecorder.stop();
        console.log("stop recordinggg, mediarecorder:", mediaRecorder);
        mediaRecorder.stream.getTracks().forEach( (track) => {
            track.stop();
        } );
        window.stream.getTracks().forEach( (track) => {
            track.stop();
        } );
        
        blobStorageRef.current = recordedBlobs
        mediaRecorder = ""
        console.log("updated blolb ref: ",blobStorageRef.current)
    }
    const _handleRecordButton = async () =>{
        if(statusPlay === "init"){
            setStatusRecord("start")
        }
        else if(statusRecord === "start"){
            // start camara, recording, and stablish button as recording
            await init(VideoHandlers.constraints);
            startRecording();
            setStatusRecord("recording")
        }
        else if(statusRecord === "recording"){
            stopRecording();
            setStatusRecord("recorded");
            //shows play button
            document.getElementById("playVideo").style.visibility = "visible";
            setCameraPreview();
            
        }
        else if(statusRecord === "recorded"){
            await init(VideoHandlers.constraints);
            setStatusRecord("start")
            setStatusPlay("play")
            document.getElementById("playVideo").style.visibility = "hidden"
            
        }
      }

    const  setCameraPreview = ()=>{
        const mimeType = 'video/webm';
        const superBuffer = new Blob(recordedBlobs, {type: mimeType});
        const recordedVideo = document.querySelector('video');
        recordedVideo.src = null;
        recordedVideo.srcObject = null;
        recordedVideo.src = window.URL.createObjectURL(superBuffer);
        recordedVideo.controls = false;
        
    }
    function startPlaying(){
        console.log("starting playing")
        setCameraPreview()
        const recordedVideo = document.querySelector('video');
        recordedVideo.play();
    }
    function stopPlaying(){
        const recordedVideo = document.querySelector('video');
        recordedVideo.pause();
    }
    const _handlePlayVideo = ()=>{
        if(statusPlay === "init"){
            setStatusPlay("start")
        }
        else if(statusPlay === "play"){
            // start camara, recording, and stablish button as recording
            startPlaying()
            setStatusPlay("stop")
        }
        else if(statusPlay === "stop"){
            // start camara, recording, and stablish button as recording
            stopPlaying()
            setStatusPlay("playFromStop")
        }
        else if(statusPlay === "playFromStop"){
            // start camara, recording, and stablish button as recording
            const recordedVideo = document.querySelector('video');
            recordedVideo.play();
            setStatusPlay("stop")
        }
    }

    const timerRecorded=()=>{
        document.querySelector("#timeStampRecording #btn").textContent = "00:"+currentTime+"/00:20"
        if(currentTime<20){
            currentTime+=1;
            timer = setTimeout(() => {
                timerRecorded()
            }, 1000);
        }
        else{
            clearTimeout(timer);
            currentTime = 0;
            document.querySelector('#showVideo').click()
        }
        
        
    }

  return (
    <div>
        <div id="timeStampRecording" sx={{visibility:"hidden"}}>
            <CircleIcon id="rcrdIcon"sx={{visibility:"hidden"}}/>
            <Button id="btn"variant="text" ></Button>
        
        </div>
        <video id="gum-local" autoPlay playsInline></video>
        <div>
        <Button variant="contained" id="showVideo" onClick={ _handleRecordButton}>
            {VideoHandlers.renderButtonStatus(statusRecord)}
        </Button>
        <Button variant="contained" id="playVideo" sx={{visibility:"hidden"}} onClick={ _handlePlayVideo}>
            {VideoHandlers.renderButtonStatus(statusPlay)}
        </Button>
        </div>

    </div>
  )
}

export default VideoRecorder