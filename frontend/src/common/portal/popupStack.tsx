import {RefObject} from "react";
import { verify } from "../../core/verify";
import {popupAppearAnimation, popupHideAnimation } from "../popup/popupHideAnimation";

const popupStack: Array<RefObject<HTMLElement|null>> = []

async function hiddenPreviousPopup() {
    if (popupStack.length > 1) {
        const previousPopup = verify(popupStack[popupStack.length - 2].current)
        await popupHideAnimation(previousPopup)
        previousPopup.style.pointerEvents = 'none'
    }
    return Promise.resolve()
}

async function appearPreviousPopup() {
    if (popupStack.length > 0) {
        const lastPopup = verify(popupStack[popupStack.length - 1].current)
        await popupAppearAnimation(lastPopup)
        lastPopup.style.pointerEvents = 'all'
    }
}

function addToStack(popupRef: RefObject<HTMLElement|null>) {
    if (!popupStack.find(ref => ref === popupRef)) {
        popupStack.push(popupRef)
    }
}

function removeFromStack() {
    popupStack.pop()
}

function isLastPopup(popupRef: RefObject<HTMLElement|null>) {
    return popupStack[popupStack.length - 1] === popupRef
}

export {
    addToStack,
    removeFromStack,
    isLastPopup,
    hiddenPreviousPopup,
    appearPreviousPopup,
}