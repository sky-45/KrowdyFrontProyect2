export const constraints = {
    audio: {
    },
    video: {
        width: 1280, height: 720
    }
};

export const renderButtonStatus = (stat) =>{
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