let timeout
let camera = function () {
    console.log('camera called')
    let Video = document.createElement('video')
    // Store shimmer interval in a variable to clear later in the event listener.
    let shimmy = shimmerInterval(Container)
    Video.setAttribute('autoplay', true)
    Video.setAttribute('playsinline', true)
    Video.classList.add('camera_video')

    if (navigator.mediaDevices.getUserMedia) {                     
        navigator.mediaDevices.getUserMedia({video: {facingMode: 'environment'}, audio: false})
        .then(function(stream) {
          Video.srcObject = stream;
          //Append the shimmer here in the video stream promise to prevent showing the shimmer before user allows use of camera. Set in a timeout to prevent appending shimmer from showing on top of initial background image.
          setTimeout(() => {Container.appendChild(shimm)}, 500)
          // timeout = buttonTimeout(shimmy)
          buttonTimeout(shimmy)
        })
        .catch(function(error) {
          console.log("Something went wrong!:", error);
        });
    }

    // Click event listener for taking a picture
    Video.addEventListener('click', e => {
      e.preventDefault()
      e.stopPropagation()
        //Clear shimmer interval and remove the shimmer container
        // console.log(timeout)
        clearInterval(shimmy)
        // clearTimeout(timeout)
        let shimmerContainer = document.querySelector('.shimmer_Container')
        //if the shimmer container is on the DOM, remove it.
        if (shimmerContainer) {shimmerContainer.remove()}
        // take the picture
        takePicture(e)
    })
 
    return Video
}

let buttonTimeout = (shimmerIntervalVariable) => {
  console.log('button timeout called')
  //The timeout for appending the camera button on the DOM after there's been 4 seconds of shimmering.
  setTimeout(() => {
    //create the camera button
    let button = document.createElement('div')
    button.classList.add('camera_button')

    button.addEventListener('click', e => { takePicture(e) })
    //Clear shimmer interval and remove the shimmer container
    clearInterval(shimmerIntervalVariable)
    let shimmerContainer = document.querySelector('.shimmer_Container')
    // If the container for the shimmer exists, remove it
    if (shimmerContainer) {shimmerContainer.remove()}
    //append the button to the dom
    Container.appendChild(button)
  }, 4000)


}

let takePicture = e => {
    e.stopPropagation()
    let Container = document.querySelector('.Container')
    let canvas = document.createElement('canvas')
    let video = document.querySelector('.camera_video')
    let button = document.querySelector('.camera_button')

    let tl = new TimelineMax({
      paused: true,
      onComplete: () => {
        //Mount the card DOM element so we can animate it, but also pass in mountSite (defined in index.js) as a callback to append the site to the DOM if the card is clicked.
        video.remove()
        Container.appendChild(card(mountSite))
        Container.appendChild(exitButton(clearPhoto))
        mountCard()
      }
    })

    //Create an output div
    let output = document.createElement('div')
    output.classList.add('camera_output')
    //The container for the photo
    let photoContainer = document.createElement('div')
    photoContainer.classList.add('camera_photoContainer')
    //The actual photo
    let photo = document.createElement('div')
    photo.classList.add('camera_photo')
    //Append the photo to the photoContainer
    photoContainer.appendChild(photo)
    //And the photoContainer to the output
    output.appendChild(photoContainer)

    //This is the stuff for drawing the image.
    let context = canvas.getContext('2d');
    canvas.width = video.offsetWidth;
    canvas.height = video.offsetHeight;
    context.drawImage(video, 0, 0, video.offsetWidth, video.offsetHeight);
    let data = canvas.toDataURL('image/png');
    photo.style.backgroundImage = `url("${data}")`

    //Finally, append the child to the output
    Container.appendChild(output)

    tl
      .to(video, 1, {autoAlpha: 0})
      .play()
} 