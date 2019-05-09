let shimmer = () => {
    console.log('shimmer called')
    let Container = document.createElement('div')
    Container.classList.add('shimmer_Container')

    let min_dot_count = 15, // Minimum number of dots
    max_dot_count = 25, // Maximum number of dots
    min_dot_size = 2, // Smallest possible dot diameter (px)
    max_dot_size = 5, // Maximum dot blur amount (px)
    max_position = 101; // Maximum position

    let dotCount = min_dot_count + Math.floor(Math.random() * (max_dot_count + 1));

    for (let i = 0; i < dotCount; i++){
        let dotContainer = document.createElement('div')
        dotContainer.classList.add('shimmer_dotContainer')
        
        //Randomize size
        let size_rand = min_dot_size + Math.floor(Math.random() * (max_dot_size + 1));
        // Randomize their left position
        let pos_left = Math.floor(Math.random() * max_position);
        // Randomize their top position
        let pos_top = Math.floor(Math.random() * max_position);
        // Randomize the time they start animating (0-5s)
        let delay_rand = Math.floor(Math.random() * 5);
        // Randomize their speed (3-8s)
        let speed_rand = 3 + Math.floor(Math.random() * 9);

        dotContainer.style.left = `${pos_left}%`
        dotContainer.style.top =`${pos_top}%`
        dotContainer.style.animationDuration = `${speed_rand}s`
        dotContainer.style.animationDelay = `${delay_rand}s`

        let dot = document.createElement('div')
        dot.classList.add('shimmer_dot')
        dotContainer.appendChild(dot)

        dot.style.width = `${size_rand}px`
        dot.style.height = `${size_rand}px`
        Container.appendChild(dotContainer)
    }

    return Container
    
}

let shimmerInterval = (container) => {
    let interval = setInterval(() => {
        console.log('shimmer interval')
        let shimmerContainer = document.querySelector('.shimmer_Container')
        if (shimmerContainer) {
            shimmerContainer.remove()
            container.appendChild(shimmer())
        }
    }, 1000)
    return interval
}