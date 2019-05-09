let camera = function () {
    //Initial background that is first clicked, remove this after video appends.
    let initBackground = document.querySelector('.init_background')
    let Video = document.createElement('video')
    let shimmy = shimmerInterval(Container)
    Video.setAttribute('autoplay', true)
    Video.setAttribute('playsinline', true)
    Video.classList.add('camera_video')

    if (navigator.mediaDevices.getUserMedia) {                     
        navigator.mediaDevices.getUserMedia({video: {facingMode: 'environment'}, audio: false})
        .then(function(stream) {
          Video.srcObject = stream;
          //Append the shimmer here in the video stream promise to prevent showing the shimmer before user allows use of camera. Set in a timeout to prevent appending shimmer from showing on top of initial background image.
          setTimeout(() => {
            // initBackground.remove()
            Container.appendChild(shimm)
          }, 500)
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
        clearInterval(shimmy)
        let shimmerContainer = document.querySelector('.shimmer_Container')
        if (shimmerContainer) {shimmerContainer.remove()}
        takePicture(e)
    })
    
    return Video
}

let takePicture = e => {
    e.stopPropagation()
    let Container = document.querySelector('.Container')
    let Wrapper = document.createElement('div')
    let canvas = document.createElement('canvas')
    let video = document.querySelector('.camera_video')

    let tl = new TimelineMax({
      paused: true,
      onComplete: () => {
        //Mount the card DOM element so we can animate it, but also pass in mountSite (defined in index.js) as a callback to append the site to the DOM if the card is clicked.
        video.remove()
        Wrapper.appendChild(card(mountSite))
        Wrapper.appendChild(exitButton(clearPhoto))
        mountCard()
      }
    })

    let output = document.createElement('div')
    output.classList.add('camera_output')
    
    let photoContainer = document.createElement('div')
    photoContainer.classList.add('camera_photoContainer')

    let photo = document.createElement('div')
    photo.classList.add('camera_photo')

    photoContainer.appendChild(photo)
    output.appendChild(photoContainer)

    let context = canvas.getContext('2d');
    canvas.width = video.offsetWidth;
    canvas.height = video.offsetHeight;
    context.drawImage(video, 0, 0, video.offsetWidth, video.offsetHeight);

    let data = canvas.toDataURL('image/png');
    photo.style.backgroundImage = `url("${data}")`

    Wrapper.appendChild(output)

    Container.appendChild(Wrapper)
    tl
      .to(video, 1, {autoAlpha: 0})
      .play()
} 