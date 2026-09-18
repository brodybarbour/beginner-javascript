// getting all elements
const video = document.querySelector(".webcam");
const canvas = document.querySelector(".video");
const ctx = canvas.getContext("2d");
const faceCanvas = document.querySelector(".face");
const faceCtx = faceCanvas.getContext("2d");

// input and control function
const inputOptions = document.querySelectorAll('.controls input[type="range"]');

// inputOptions.forEach(function (input) {
//   input.addEventListener('input', handleOption);
// });
inputOptions.forEach(input => input.addEventListener('input', handleOption));

function handleOption(event) {
  const {value, name} = event.currentTarget;
  mods[name] = parseFloat(value);
};

// making new object called FaceDetector
const faceDetector = new window.FaceDetector();

const mods = {
  SIZE: 10,
  SCALE: 1.35,
}

// console.log(video, canvas, faceCanvas, faceDetector);

// function that populate video element on page:
async function populateVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {width: faceCanvas.width, height: faceCanvas.height,}
  });
  
  video.srcObject = stream;
  await video.play();

  // make the canvas items the same size as the video element
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  faceCanvas.width = video.videoWidth;
  faceCanvas.height = video.videoHeight;
}

async function detect() {
  const faces = await faceDetector.detect(video);
  // console.log(faces, 'faces variable');
  // calling the function inside of itself is called recursion.
  // this happens over and over until something stops it from running more.
  faces.forEach(drawFace);
  faces.forEach(censor);
  requestAnimationFrame(detect);
}

function drawFace(face) {
  const {width, height, top, left} = face.boundingBox;
  // console.log({width, height, top, left});
  ctx.strokeStyle = "#ffc600";
  ctx.lineWidth = 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(left, top, width, height);
}

// could do this
// function censor(face) {
//   const faceDetails = face.boundingBox;
// }

// can destructure off of argument being passed in:
/*this will create a variable w/ data associated with
  key/value pair from what is passed into function
*/
function censor({ boundingBox: face }) {
  faceCtx.imageSmoothingEnabled = false;
  faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
  // draw the small version of the detected face
  faceCtx.drawImage(
    // these areguments are all about there source of what we're drawing
    video, // where does the source of what we are drawing come from?
    face.x, // Where do we star
    face.y,
    face.width,
    face.height,
    // these arguments are all about drawing
    face.x, // where to start drawing
    face.y,
    mods.SIZE,
    mods.SIZE
  );

  const width = face.width * mods.SCALE;
  const height = face.width * mods.SCALE;

  //draw the small face back on, but big
  faceCtx.drawImage(
    faceCanvas, // where does the source of what we are drawing come from?
    face.x, // Where do we star
    face.y,
    mods.SIZE,
    mods.SIZE,
    //drawing arguments
    face.x - (width - face.width) / 2,
    face.y - (width - face.height) / 2,
    width,
    height
  )

  // take that face and draw it back up to normal size
}

populateVideo().then(detect);