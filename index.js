var video = document.createElement('video');
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const canvas = document.getElementById('theCanvas');
const charsCanvas = document.getElementById('outputChars');
canvas.width = 50;
canvas.height = 50;
var charArray = new Array(2500);
var canvasFrameManipulate;
video.setAttribute('playsinline', '');
video.setAttribute('autoplay', '');
video.setAttribute('muted', '');
video.style.width = '200px';
video.style.height = '200px';
function grabFrame()
{
    canvas.getContext("2d").drawImage(video, 0, 0, 50, 50);
    const imageData = canvas.getContext("2d").getImageData(0, 0, 50, 50);
    let charArrayIndex = 0;
    for(i=0; i<imageData.data.length; i+=4){
      let avg = (imageData.data[i] + imageData.data[i+1] + imageData.data[i+2])/3;
      
      if(avg>125){
        charArray[charArrayIndex] = "H";
      }
      else{
        charArray[charArrayIndex] = "*";
      }
      charArrayIndex++;
    }
    
    canvas.getContext("2d").putImageData(imageData, 0, 0);
    outputChars();
}
function brightChar(avg){
  
}
function outputChars()
{
    charsCanvas.innerHTML = "";
    let outputText = "";
    for(i=0; i<2500; i++){
      outputText += charArray[i];
      //console.log(outputText);
      if((i+1)%50==0){
        outputText += '<br>';
      }
    }
    charsCanvas.innerHTML = outputText;

}


/* Setting up the constraint */
var facingMode = "user"; // Can be 'user' or 'environment' to access back or front camera (NEAT!)
var constraints = {
  audio: false,
  video: {
  facingMode: "user"
  }
};

/* Stream it to video element */
navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
  video.srcObject = stream;
  setInterval(grabFrame, 100);
});


document.body.appendChild(video);