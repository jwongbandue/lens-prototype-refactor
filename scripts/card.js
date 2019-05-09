
let card = (cb) => {
    console.log('card')
    let query = window.location.search.slice(1)

    let Container = document.createElement('div')
    Container.classList.add('card_Container')
    Container.classList.add('Quicksand')

    let tab = document.createElement('div')
    tab.classList.add('card_tab')
    Container.appendChild(tab)

    Container.addEventListener('click', e => {
        e.stopPropagation()
        cb()
    })

    let copy
    switch (query){
        case '1':
        copy = {
            "header": "Your Michelob City Action Pack", 
            "subheader": "Your invitation to the hottest spots in Bogota."
        }
        break
        case '2':
        copy = {
            "header": "Learn Champeta with Stephanie Cayo",
            "subheader": "Get moving to this exclusive Colombian beat."
        }
        break
        case '3':
        copy = {
            "header": "Your Michelob Local Motion Pack",
            "subheader": "Your invitation to the hottest spots in NYC."
        }
        break
        case '4':
        copy = {
            "header": "Your Limited Edition Tattoo Bottle",
            "subheader": "Hear the story behind the rose of a King."
        }
        break
        case '5':
        copy = {
            "header": "Your Limited Edition Tattoo Bottle",
            "subheader": "Hear the story behind the rose of a King."
        }
        break
        default:
        copy = {
            "header": "Your Michelob City Action Pack", 
            "subheader": "Your invitation to the hottest spots in Bogota."
        }
        break
    }
    let infoContainer = document.createElement('div')
    infoContainer.classList.add('card_infoContainer')
    infoContainer.innerHTML = `
            <div class=card_header'>
                <h2>Unlock</h2>
                <span>${copy.header}</span>
            </div>
            <div class=" card card_grid">
                <div class="${query === '4' || query === '5' ? 'card_budweiserLogo' : 'card_ribbon'}"></div>
                <div class="card_copy">${copy.subheader}</div>
            </div>
    `

    Container.appendChild(infoContainer)

    return Container
}