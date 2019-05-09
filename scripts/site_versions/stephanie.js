function stephanie(){
    let tl = new TimelineMax({paused: true})
    let Container = document.createElement('div')
    Container.classList.add(style.Container)
    Container.classList.add(style.stephanie)
    let card = document.querySelector(`.${cardStyle.Container}`)
    let exitButton = document.querySelector(`.${landingStyle.exit}`)

    let cta = document.createElement('div')
    cta.classList.add(style.cta)
    cta.addEventListener('click', e => {
        e.stopPropagation()
        window.location.assign('https://www.google.com/maps')
    })
    Container.appendChild(cta)


    tl
        .to([card, exitButton], .5, {x: '-=415', ease: Power2.easeOut})
        .from(Container, .5, {x: 415, ease: Power2.easeOut}, '-=.5')
        .play()

    Container.addEventListener('click', e => {
        e.stopPropagation()
        let exitTl = new TimelineMax({
            paused: true,
        })
        exitTl
            .to([card, exitButton], .5, {x: '+=415', ease: Power2.easeOut})
            .to(Container, .5, {x: '+=415', ease: Power2.easeOut}, '-=.5')
            .play()
    })

    return Container
}