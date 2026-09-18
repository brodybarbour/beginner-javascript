// getting all elements
const video = document.querySelector(".webcam");
const canvas = document.querySelector(".video");
const ctx = canvas.getContext("2d");
const faceCanvas = document.querySelector(".face");
const faceCtx = canvas.getContext("2d");
// making new object called FaceDetector
const faceDetector = new window.FaceDetector();


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
  console.log(faces, 'faces variable');
  // calling the function inside of itself is called recursion.
  // this happens over and over until something stops it from running more.
  faces.forEach(drawFace);
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

populateVideo().then(detect);