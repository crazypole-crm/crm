import {animate, createAnimation} from "./animation";

function createFadeInAnimation(time: number = 150) {
    return createAnimation({
        opacity: [0, 1],
    }, time)
}

function animateFadeIn(element: HTMLElement, time: number = 150) {
    const animation = createFadeInAnimation(time)
    return Promise.all([
        animate(element, animation)
    ])
}

export {
    animateFadeIn,
    createFadeInAnimation,
}