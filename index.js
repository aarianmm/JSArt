var video = document.getElementById('theVideo');
var windowWidth = Math.floor(window.innerWidth/10);
var windowHeight = Math.floor(window.innerHeight/10);
const canvas = document.getElementById('theCanvas');
const charsCanvas = document.getElementById('outputChars');
const button = document.getElementById('button');
canvas.width = windowWidth;
canvas.height = windowHeight;
let cropX, cropY, cropWidth, cropHeight;
video.onloadedmetadata = function resizeCanvas()
{
  const aspectRatio = (windowWidth / windowHeight)*0.75;
  const videoAspectRatio = video.videoWidth / video.videoHeight;
  windowWidth = Math.floor(window.innerWidth/10);
  windowHeight = Math.floor(window.innerHeight/10);
  charArray = new Array(windowWidth*windowHeight);
  if (aspectRatio > videoAspectRatio) {
    cropWidth = video.videoWidth;
    cropHeight = video.videoWidth / aspectRatio;
    cropX = 0;
    cropY = (video.videoHeight - cropHeight) / 2;
  } else {
    cropWidth = video.videoHeight * aspectRatio;
    cropHeight = video.videoHeight;
    cropX = (video.videoWidth - cropWidth) / 2;
    cropY = 0;
  }
  canvas.getContext("2d").drawImage(video, cropX, cropY, cropWidth, cropHeight, 0, 0, windowWidth, windowHeight);

  console.log(aspectRatio, videoAspectRatio, cropX, cropY, cropWidth, cropHeight);
}

var charArray = new Array(windowWidth*windowHeight);
var canvasFrameManipulate;
video.setAttribute('playsinline', '');
video.setAttribute('autoplay', '');
video.setAttribute('muted', '');
const frameRate = 10; //lower is smoother, but more cpu intensive
var darkMode = false; //change colour
video.style.width = windowWidth+'px';
video.style.height = windowHeight+'px';
window.onresize = resizeCanvas;
/* Setting up the constraint */
var facingMode = "user"; // Can be 'user' or 'environment' to access back or front camera (NEAT!)
var constraints = {
  audio: false,
  video: {
  facingMode: "user"
  }
};
var BrightCharArray = ['$','@','B','%','8','&','W','M','#','*','o','a','h','k','b','d','p','q','w','m','Z','O','0','Q','L','C','J','U','Y','X','z','c','v','u','n','x','r','j','f','t','/','|','(',')','1','{','}','[',']','?','-','_','+','~','i','!','l','I',';',':',',','"','^','`','.'];
  button.onclick = function()
  {
    darkmode = !darkmode;
    BrightCharArray.prototype.reverse();
    if(darkmode)
    {
      document.body.style.backgroundColor = "black";
    }
    else
    {
      document.body.style.backgroundColor = "white";
    }
  }


function grabFrame()
{
    canvas.getContext("2d").drawImage(video, cropX, cropY, cropWidth, cropHeight, 0, 0, windowWidth, windowHeight);
    const imageData = canvas.getContext("2d").getImageData(0, 0, windowWidth, windowHeight);
    let charArrayIndex = 0;
    for(i=0; i<imageData.data.length; i+=4){
      let avg = (imageData.data[i] + imageData.data[i+1] + imageData.data[i+2])/3;
      

      charArray[charArrayIndex] = brightChar(avg, darkMode, 1);
      charArrayIndex++;
    }
    
    canvas.getContext("2d").putImageData(imageData, 0, 0);
    outputChars();
}
function brightChar(avg, darkMode, density){
  
  for(let j=0; j<BrightCharArray.length; j+=density) //255/69 = 3.69
  {
    if(avg<(255/BrightCharArray.length)*j)
    {
      return BrightCharArray[j];
    }
  }
  return BrightCharArray[BrightCharArray.length-1];
  
}
function outputChars()
{
    charsCanvas.innerHTML = "";
    let outputText = "";
    for(i=0; i<windowHeight*windowWidth; i++){
      outputText += charArray[i];
      //console.log(outputText);
      if((i+1)%windowWidth==0){
        outputText += '<br>';
      }
    }
    charsCanvas.innerHTML = outputText;

}




/* Stream it to video element */
navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
  video.srcObject = stream;
  setInterval(grabFrame, frameRate);
}).catch(function() {
  charsCanvas.innerHTML = "Error: Camera not found";
});


