var video = <HTMLVideoElement> document.getElementById('theVideo')!;
const approxFontSize = 9;
var windowWidth = Math.floor(window.innerWidth/approxFontSize);
var windowHeight = Math.floor(window.innerHeight/approxFontSize);
const canvas = <HTMLCanvasElement> document.getElementById('theCanvas')!;
const charsCanvas = document.getElementById('outputChars')!;
var charDensity = 1;
var oldCharDensity = charDensity;
canvas.width = windowWidth;
canvas.height = windowHeight;
var charArray = new Array(windowWidth*windowHeight);
//const shortPoem = "We become what we think about most of the time, and that's the strangest secret.".replaceAll(" ","_")+'_';
const shortPoem: string = "Ooh You can dance You can jive Having the time of your life Ooh, see that girl Watch that scene Digging the dancing queen Friday night and the lights are low Looking out for a place to go Where they play the right music Getting in the swing You come to look for a king Anybody could be that guy Night is young and the music's high With a bit of rock music Everything is fine You're in the mood for a dance And when you get the chance You are the dancing queen Young and sweet Only seventeen Dancing queen Feel the beat from the tambourine, oh yeah You can dance You can jive Having the time of your life Ooh, see that girl Watch that scene Digging the dancing queen You're a teaser, you turn 'em on Leave 'em burning and then you're gone Looking out for another Anyone will do You're in the mood for a dance And when you get the chance You are the dancing queen Young and sweet Only seventeen Dancing queen Feel the beat from the tambourine, oh yeah You can dance You can jive Having the time of your life Ooh, see that girl Watch that scene  Digging the dancing queen Digging the dancing queen".replace("/\s/g","_")+'_';
console.log(shortPoem);
var longPoem = repeatPoem(windowWidth*windowHeight);
var fixedPoints:boolean[] = new Array<boolean>(windowWidth*windowHeight);
fixedPoints = fill(fixedPoints, false);
var morphing = false;
var changingDensity = false;
const changingDensityInterval = 1000000; //once every x frames
const changingDensityBy = 1; //by how much each time
var densityChangeSparcer = true;
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

//var BrightCharArray = ['$','@','B','%','8','&','W','M','Z','O','0','Q','#','*','o','a','e','h','k','b','d','p','q','w','m','L','C','J','U','Y','X','z','g','s','c','v','u','n','x','r','y','j','f','t','/','|','(',')','1','{','}','[',']','?','-','_','+','~','i','!','l','I',';',':',',','"','^','`','.'];
var BrightCharArray:string[] = ['#','@','O','0','H','M','N','F','m','n','p','r','Q','J','B','D','P','K','R','A','E','a','d','g','o','q','C','G','S','U','V','W','X','Z','Y','T','L','b','c','e','f','h','i','j','k','l','s','t','u','v','w','x','y','z','*','/','|','(',')','?','-','_','+','~','!',',','\'','"','^','`','.','I',';',':','l'];
//var BrightCharArray = [',','.','`','^','\'','-','_','~','!',';',':','I','l','i','t','f','T','L','r','c','J','u','n','v','z','j','/','(','S','m','w','G','C','Q','O','U','D','P','A','R','B','X','E','F','K','V','Y','H','N','Z','0','Q','B','D','P','R','A','a','d','g','o','q','C','G','S','U','V','W','X','Y','H','F','L','b','c','e','f','h','i','j','k','l','m','n','p','r','s','t','u','v','w','x','y','z','*','|',')','?','+',',','"','^','`'];

//var temp = [] //not sure which is better- need to find definite answer and sort out
//BrightCharArray = backupCharArray;

{
  let poemWorksFeedback = poemWorks(shortPoem);
  if(poemWorksFeedback != ""){
    console.log("ERROR: POEM CONTAINS INACESIBLE CHARACTER - " + poemWorksFeedback);
  }
}
function triggerMorph(){
  if(morphing){ //stop
    morphing =false;
    charDensity = oldCharDensity;
    //BrightCharArray = temp;

    resizeCanvas();
  }
  else{ //start
    fixedPoints = new Array(windowWidth*windowHeight);
    fill(fixedPoints, false);
    oldCharDensity = charDensity;
    charDensity = 1;
    // temp = BrightCharArray;
    // BrightCharArray = backupCharArray;
    morphing = true;
  }
  console.log(morphing.toString());
}

function repeatPoem(len){
  let fullPoem = "";
  while(fullPoem.length<len){
    fullPoem += shortPoem;
  }
  return fullPoem.substring(0, len);
}

function changeMode(){
  darkMode = !darkMode;
  BrightCharArray.reverse();
  //backupCharArray.reverse();
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

    else if(!changingDensity&&(event.key == 'm'||event.key == 'M'))
    {
      triggerMorph();
    }

    else if(!morphing && (event.key == 'p'||event.key == 'P')){
      charDensity=1;
      densityChangeSparcer = true;
      changingDensity=!changingDensity;
      console.log(changingDensity.toString());
    }

    else if(!morphing&&!changingDensity&&charDensity>1&&(event.key == '='||event.key == '+'))
    { //if changing density, change the frame speed thing instead
      charDensity--;
      console.log(charDensity);
    }

    else if(!morphing&&!changingDensity&&charDensity<65&&(event.key == '-'||event.key == '_')) //set to consts later
    {
      charDensity++;
      console.log(charDensity);
    }

    // else if(event.key == 'a'||event.key == 'A') //to switch between alphabet and old chars
    // {
    //   temp = BrightCharArray;
    //   BrightCharArray = backupCharArray;
    // }
    
},false);

charsCanvas.addEventListener('click', (event) => 
{
  changeMode(); //should be if(mobile) but it doesn't work with ipad
},false);



function resizeCanvas()
{
  if(!morphing)
  {
    console.log("resized");
    windowWidth = Math.floor(window.innerWidth/approxFontSize);
    windowHeight = Math.floor(window.innerHeight/approxFontSize);
    canvas.width = windowWidth;
    canvas.height = windowHeight;
    charArray = new Array(windowWidth*windowHeight);
    fixedPoints = new Array(windowWidth*windowHeight);
    fixedPoints = fill(fixedPoints, false);
    longPoem = repeatPoem(windowWidth*windowHeight);
  }
  else{
    console.log("did not resize");
  }
}

function drawFrame()
{
  charsCanvas.innerHTML = "";
  let outputText = "";  
  canvas.getContext("2d")?.drawImage(video, 0, 0, windowWidth, windowHeight);
  const imageData = canvas.getContext("2d")?.getImageData(0, 0, windowWidth, windowHeight)!;
  let charArrayIndex = 0;
  for(let i=0; i<imageData.data.length; i+=4){
    if(!fixedPoints[charArrayIndex]){
      let avg = (imageData.data[i] + imageData.data[i+1] + imageData.data[i+2])/3;
      let desiredChar = brightChar(avg, charDensity);
      outputText += desiredChar; //add char to output
      if(morphing){
        checkMerging(charArrayIndex, desiredChar);
      }
      else if(changingDensity && charArrayIndex%changingDensityInterval==1){
        oscillateDensity();
        console.log(charDensity);
      }
    }
    else{
      outputText += longPoem[charArrayIndex]; //maintain fixed point from poem
    }
    if((charArrayIndex+1)%windowWidth==0){
      outputText += '<br>';
    }
    charArrayIndex++;
  
  }
  charsCanvas.innerHTML = outputText;
  
  //outputChars();
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

function checkMerging(index, desiredChar){
  //console.log("being checked");
  if(desiredChar == longPoem[index]){
    fixedPoints[index] = true;  //freeze in place
  }
}

function oscillateDensity(){
  if(densityChangeSparcer){ //becoming lower quality
    //charDensity++;
    charDensity+=changingDensityBy;
    if(charDensity>=35-changingDensityBy){ //boring after 51 - set to consts later
      densityChangeSparcer = !densityChangeSparcer;
    }
  }
  else{ //becoming higher quality
    //charDensity--;
    charDensity-=changingDensityBy;
    if(charDensity<=changingDensityBy){
      densityChangeSparcer = !densityChangeSparcer; //next one will break range, so switch direction
    }
  }
  
}

function poemWorks(poem:string){
  for(let i=0; i<shortPoem.length; i++){
    if(!contains(BrightCharArray, poem[i])){
      return poem[i];
    }
  }
  
  return "";
}

function fill(arr, value){
  for(let i=0; i<arr.length; i++){
    arr[i] = value;
  }
  return arr;
}

function contains(arr, value){
  for(let i=0; i<arr.length; i++){
    if(arr[i]==value){
      return true;
    }
  }
  return false;
}

/* Stream it to video element */
navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
  video.srcObject = stream;
  setInterval(drawFrame, frameRate);
}).catch(function() {
  charsCanvas.innerHTML = "Error: Camera not found";
});



