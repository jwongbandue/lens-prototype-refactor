function site(cb){
    let query = window.location.search.slice(1)

    let info
    switch (query){
        case '1':
            info = matiz()
        break
        case '2':
            info = stephanie()
        break
        case '3' :
            info = standard()
        break
        case '4' :
            info = budweiser(query)
        break
        case '5' :
            info = budweiser(query)
        break
        default:
            info = matiz()
        break
    }

    return info
}