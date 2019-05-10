function matiz(){
    let tl = new TimelineMax({paused: true})
    let Container = document.createElement('div')
    Container.classList.add('site_Container')
    Container.classList.add('matiz')
    let card = document.querySelector(`.card_Container`)

    let cta = document.createElement('div')
    cta.classList.add('cta')
    cta.addEventListener('click', e => {
        e.stopPropagation()
        window.location.assign('https://www.google.com/maps/place/Matiz/@4.6791359,-74.0473103,18z/data=!4m5!3m4!1s0x0:0x4c39d0368384b3!8m2!3d4.6789648!4d-74.0464306')
    })
    Container.appendChild(cta)


    tl
        .to([card], .5, {x: '-=415', ease: Power2.easeOut})
        .from(Container, .5, {x: 415, ease: Power2.easeOut}, '-=.5')
        .play()

    Container.addEventListener('click', e => {
        //Prevent propagation here so that the even listener on the parent does not get called.
        e.stopPropagation()
        let toggleCardTL = new TimelineMax({
            paused: true,
        })
        toggleCardTL
            .to([card], .5, {x: '+=415', ease: Power2.easeOut})
            .to(Container, .5, {x: '+=415', ease: Power2.easeOut}, '-=.5')
            .play()
    })

    return Container
}