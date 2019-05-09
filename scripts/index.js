let Container = document.querySelector('.Container')
let shimm = shimmer()

// Mount card animation to be called in takePicture-- when the timeline completes in takePicture, the card timeline should play.
let mountCard = () => {
    let tl = new TimelineMax({paused: true})
    let cardContainer = document.querySelector(`.card_Container`)

    tl
      .to(cardContainer, .5, { y: -310})
      .play()
}

let mountSite = () => {
  let siteContainer = document.querySelector('.site_Container')
  //If the site is not already on the DOM, append it.
  if (!siteContainer){Container.appendChild(site(clearPhoto))}
  //if it is on the DOM, toggle the card
  else {toggleCard()}
}

let toggleCard = () => {
    let card = document.querySelector(`.card_Container`)
    let site = document.querySelector('.site_Container')
    let tl = new TimelineMax({paused: true})
    tl
      .to(card, .5, {x: '-100%'})
      .to(site, .5, {x: 0}, '-=.5')
      .play()
}

let clearPhoto = () => {
    let output = document.querySelector(`.camera_output`)
    let cardContainer = document.querySelector(`.card_Container`)
    let shimmerContainer = document.querySelector(`.shimmer_Container`)
    let exitButton = document.querySelector('.exitButton')
    let canvas = document.getElementsByTagName('canvas')[0]
    let site = document.querySelector(`.site_Container`) || document.querySelector(`.budContainer`)
    let tl = new TimelineMax({
      paused: true,
      onComplete: () => {
        output.remove()
        cardContainer.remove()
        if (shimmerContainer) {shimmerContainer.remove()}
        if (canvas) {canvas.remove()}
        if (exitButton) {exitButton.remove()}
        if (site) {site.remove()}
        Container.appendChild(camera())
      }
    })
    tl
      .to(cardContainer, .25, {y: '+=310'})
      .to(output, .25, {autoAlpha: 0}, '-=.25')
      .play()
}

// Exit button component. Returns the exit button DOM element. Called in takePicture() in camera.js
let exitButton = (cb) => {
    
    let buttonContainer = document.createElement('div')
    buttonContainer.classList.add('exitButton')

    //Click event passed here is clearPhoto. 
    buttonContainer.addEventListener('click', e => {
        e.stopPropagation()
        cb()
    })

    return buttonContainer
}

Container.innerHTML = `
    <div class='init_background'></div>
`
Container.addEventListener('click', e => {
    console.log('append stream')
    e.stopPropagation()
    e.preventDefault()
    Container.appendChild(camera())
})
