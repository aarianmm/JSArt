var video = document.getElementById('theVideo');
console.log(window.innerWidth);
console.log(window.innerHeight);
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
// window.mobileAndTabletCheck = function() //doesnt work with ipad UGH
// {   
//   let check = false;
//   (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
//   return check;
// };
//const mobile = window.mobileAndTabletCheck();
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


function changeMode(){
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
document.addEventListener('keydown', (event) => 
{
    if(event.key == 'd'||event.key == 'D'||event.key == 'l'||event.key == 'L')
    {
        changeMode();
    }
},false);

charsCanvas.addEventListener('click', (event) => 
{
  changeMode(); //should be if(mobile) but it doesn't work with ipad
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


