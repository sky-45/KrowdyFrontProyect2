import React from 'react'
import Button from '@mui/material/Button';

const VideoRecorder = () => {

    let statusRecord = "start"
    let statusPlay = "play"
    function setStatusRecord(val){
        statusRecord = val+""
        document.getElementById("showVideo").textContent = renderButtonStatus(statusRecord)
    }
    function setStatusPlay(val){
        statusPlay = val+""
        document.getElementById("playVideo").textContent = renderButtonStatus(statusPlay)
    }

    const renderButtonStatus = (stat) =>{
        switch(stat){
            case "start":
                return "start recording";
            case "recording":
                return "stop recording";
            case "recorded":
                return "record again";
            case "play":
                return "play record";
            case "stop":
                return "stop playing";
            case "playFromStop":
                return "play record";
                        
            default:
                return "start recording"
        }
    }
    let mediaRecorder;
    let recordedBlobs;
    // audio functions
    const constraints = {
        audio: {
          
        },
        video: {
          width: 1280, height: 720
        }
      };
    function handleSuccess(stream) {
        const liveVideo = document.querySelector('video');
        window.stream = stream; // make variable available to browser console
        liveVideo.srcObject = stream;

    }
    
    async function init() {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
    }

    function handleDataAvailable(event) {
        console.log('handleDataAvailable', event);
        if (event.data && event.data.size > 0) {
          recordedBlobs.push(event.data);
        }
      }
    console.log("redefnotodooo")
    function startRecording() {
        recordedBlobs = [];
        const mimeType = 'video/webm;codecs=vp9,opus';
        const options = {mimeType};
        try {
          mediaRecorder = new MediaRecorder(window.stream, options);
        } catch (e) {
          //console.error('Exception while creating MediaRecorder:', e);
          //errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
          return;
        }
        console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
        mediaRecorder.onstop = (event) => {
            //console.log('Recorder stopped: ', event);
            //console.log('Recorded Blobs: ', recordedBlobs);
          };
        
        mediaRecorder.ondataavailable = handleDataAvailable;
        //console.log('MediaRecorder started', mediaRecorder);
        mediaRecorder.start();
    }

    

    function stopRecording() {
        console.log("stop recordinggg, mediarecorder:", mediaRecorder)
        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach( (track) => {
            console.log(track)
            track.stop();

        } );

    }



    const _handleRecordButton = async () =>{
        if(statusRecord === "start"){
            // start camara, recording, and stablish button as recording
            await init(constraints);
            startRecording();
            setStatusRecord("recording")
        }
        else if(statusRecord === "recording"){
            stopRecording();
            setStatusRecord("recorded")
            //shows play button
            document.getElementById("playVideo").style.visibility = "visible"
            
        }
        else if(statusRecord === "recorded"){
            await init(constraints);
            setStatusRecord("start")
            setStatusPlay("play")
            document.getElementById("playVideo").style.visibility = "hidden"
            
        }
      }
    function startPlaying(){
        console.log("starting playing")
        const mimeType = 'video/webm';
        const superBuffer = new Blob(recordedBlobs, {type: mimeType});
        const recordedVideo = document.querySelector('video');
        recordedVideo.src = null;
        recordedVideo.srcObject = null;
        recordedVideo.src = window.URL.createObjectURL(superBuffer);
        recordedVideo.controls = false;
        recordedVideo.play();
    }
    function stopPlaying(){
        const recordedVideo = document.querySelector('video');
        recordedVideo.pause();
    }
    const _handlePlayVideo = ()=>{
        if(statusPlay === "play"){
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
  return (
    <div>
        <video id="gum-local" autoPlay playsInline></video>
        <div>
        <Button variant="contained" id="showVideo" onClick={ _handleRecordButton}>
            {renderButtonStatus(statusRecord)}
        </Button>
        <Button variant="contained" id="playVideo" sx={{visibility:"hidden"}} onClick={ _handlePlayVideo}>
            {renderButtonStatus(statusPlay)}
        </Button>
        </div>

    </div>
  )
}

export default VideoRecorder