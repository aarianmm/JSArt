var video = document.getElementById('theVideo');
var windowWidth = Math.floor(window.innerWidth/10);
var windowHeight = Math.floor(window.innerHeight/10);
const canvas = document.getElementById('theCanvas');
const charsCanvas = document.getElementById('outputChars');
canvas.width = windowWidth;
canvas.height = windowHeight;
var charArray = new Array(windowWidth*windowHeight);
video.setAttribute('playsinline', '');
video.setAttribute('autoplay', '');
video.setAttribute('muted', '');
const frameRate = 10; //lower is smoother, but more cpu intensive
var darkMode = false;
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

const BrightCharArray = ['$','@','B','%','8','&','W','M','#','*','o','a','h','k','b','d','p','q','w','m','Z','O','0','Q','L','C','J','U','Y','X','z','c','v','u','n','x','r','j','f','t','/','|','(',')','1','{','}','[',']','?','-','_','+','~','i','!','l','I',';',':',',','"','^','`','.'];

document.addEventListener('keydown', (event) => 
{
  console.log(event.key);
    if(event.key == 'd'||event.key == 'D'||event.key == 'l'||event.key == 'L')
    {
        darkMode = !darkMode;
        BrightCharArray.reverse();
        if(darkMode){
          document.body.style.backgroundColor = "black";
          charsCanvas.style.color = "white";
        }
        else{
          document.body.style.backgroundColor = "white";
          charsCanvas.style.color = "black";
        }
    }
},false);






function resizeCanvas()
{
  windowWidth = Math.floor(window.innerWidth/10);
  windowHeight = Math.floor(window.innerHeight/10);
  canvas.width = windowWidth;
  canvas.height = windowHeight;
  charArray = new Array(windowWidth*windowHeight);
}

function grabFrame()
{
    canvas.getContext("2d").drawImage(video, 0, 0, windowWidth, windowHeight);
    const imageData = canvas.getContext("2d").getImageData(0, 0, windowWidth, windowHeight);
    let charArrayIndex = 0;
    for(i=0; i<imageData.data.length; i+=4){
      let avg = (imageData.data[i] + imageData.data[i+1] + imageData.data[i+2])/3;
      

      charArray[charArrayIndex] = brightChar(avg, 1);
      charArrayIndex++;
    }
    
    canvas.getContext("2d").putImageData(imageData, 0, 0);
    outputChars();
}
function brightChar(avg, density){
  
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


