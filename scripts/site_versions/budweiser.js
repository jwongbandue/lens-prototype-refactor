function budweiser(query){
    let tl = new TimelineMax({paused: true})
    let Container = document.createElement('div')
    Container.classList.add('budContainer')
    let card = document.querySelector(`.card_Container`)
    // let exitButton = document.querySelector(`.${landingStyle.exit}`)

    let link
    switch (query){
        case '4':
            link = 'https://player.vimeo.com/external/331786713.m3u8?s=52bfa2e94b53187b4f518bad2cc09d9451770a76'
        break
        case '5': 
            link = 'https://player.vimeo.com/external/329607468.sd.mp4?s=e63ba5104b0cf7f1bae9748aed8430335c668d6a&profile_id=165'
        break
        default:
            link = 'https://player.vimeo.com/external/331786713.sd.mp4?s=bcbae37f00fea2a92192127f2a0b55761a3fefa7&profile_id=165'
        break
    }
    Container.innerHTML =  `
        <div class='budVideo'>
            <video controls loop autoplay>
                <source src="${link}" type="video/mp4">
            </video>
        </div>
    `
    
    tl
        .to([card], .5, {x: '-=415', ease: Power2.easeOut})
        .from(Container, .5, {x: 415, ease: Power2.easeOut}, '-=.5')
        .play()

    Container.addEventListener('click', e => {
        e.stopPropagation()
        let exitTl = new TimelineMax({
            paused: true,
        })
        exitTl
            .to([card], .5, {x: '+=415', ease: Power2.easeOut})
            .to(Container, .5, {x: '+=415', ease: Power2.easeOut}, '-=.5')
            .play()
    })

    return Container
}