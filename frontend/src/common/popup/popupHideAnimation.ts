import {animate, Animation, createAnimation} from "../../core/animation/animation";
import {verify} from "../../core/verify";
import {animateFadeOut} from "../../core/animation/fadeOutAnimation";
import { animateFadeIn } from "../../core/animation/fadeInAnimation";

async function popupAppearAnimation(popupWrapper: HTMLElement, time: number = 150) {
    document.body.style.overflow = 'hidden'
    const popup = verify(popupWrapper.firstElementChild) as HTMLElement
    const popupLayer = verify(popupWrapper.parentElement)

    const {
        height: popupHeight,
        width: popupWidth,
    } = popup.getBoundingClientRect()
    const transformYEnd = -popupHeight / 2
    const transformXStart = -popupWidth / 2
    const popupAnimation: Animation = createAnimation({
        transform: [[transformXStart, transformXStart], [transformYEnd + 15, transformYEnd]],
        opacity: [0, 1]
    }, time)

    return Promise.all([
        animate(popup, popupAnimation),
        animateFadeIn(popupLayer, time)
    ]).then(() => {
        document.body.style.overflow = 'auto'
        popup.style.transform = 'translate(-50%, -50%)'
    })
}

async function popupHideAnimation(popupWrapper: HTMLElement, time: number = 150) {
    document.body.style.overflow = 'hidden'
    const popup = verify(popupWrapper.firstElementChild) as HTMLElement
    const popupLayer = verify(popupWrapper.parentElement)

    const {
        height: popupHeight,
        width: popupWidth,
    } = popup.getBoundingClientRect()
    const transformYStart = -popupHeight / 2
    const transformXStart = -popupWidth / 2
    const popupAnimation: Animation = createAnimation({
        transform: [[transformXStart, transformXStart], [transformYStart, transformYStart + 15]],
        opacity: [1, 0]
    }, time)

    return Promise.all([
        animate(popup, popupAnimation),
        animateFadeOut(popupLayer, time)
    ]).then(() => document.body.style.overflow = 'auto')
}

export {
    popupHideAnimation,
    popupAppearAnimation,
}