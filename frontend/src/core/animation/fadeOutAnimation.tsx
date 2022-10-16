import {animate, createAnimation} from "./animation";


function createFadeOutAnimation(time: number = 150) {
    return createAnimation({
        opacity: [1, 0],
    }, time)
}

function animateFadeOut(element: HTMLElement, time: number = 150) {
    const animation = createFadeOutAnimation(time)
    return Promise.all([
        animate(element, animation)
    ])
}

export {
    createFadeOutAnimation,
    animateFadeOut,
}