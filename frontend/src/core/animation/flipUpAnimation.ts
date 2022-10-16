import {animate, createAnimation} from "./animation";


function createFlipUpAnimation(element: HTMLElement, flipOffset: number = 10, time: number = 150) {
    const startTop = element.getBoundingClientRect().top
    return createAnimation({
        opacity: [0, 1],
        top: [startTop + flipOffset, startTop],
    }, time)
}

function animateFlipUp(element: HTMLElement, flipOffset: number = 10, time: number = 150) {
    const screenOverflow = window.getComputedStyle(document.body).getPropertyValue('overflow')
    document.body.style.overflow = 'hidden'
    const animation = createFlipUpAnimation(element, flipOffset, time)
    return Promise.all([
        animate(element, animation)
    ]).then(() => document.body.style.overflow = screenOverflow)
}

export {
    animateFlipUp,
    createFlipUpAnimation,
}