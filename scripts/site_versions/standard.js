function standard(){
    let tl = new TimelineMax({paused: true})
    let Container = document.createElement('div')
    Container.classList.add('site_Container')
    Container.classList.add('standard')
    let card = document.querySelector(`.card_Container`)
    // let exitButton = document.querySelector(`.${landingStyle.exit}`)

    let cta = document.createElement('div')
    cta.classList.add('cta')
    cta.addEventListener('click', e => {
        e.stopPropagation()
        window.location.assign('https://www.google.com/maps/place/The+Standard,+High+Line/@40.7408254,-74.0089478,18z/data=!4m5!3m4!1s0x0:0x505cfe96ba9da92a!8m2!3d40.7409232!4d-74.008111')
    })
    Container.appendChild(cta)


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