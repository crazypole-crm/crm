import {Portal} from "./Portal";
import React, {MutableRefObject, useCallback, useEffect, useRef, useState} from "react";
import styles from './PopupPortal.module.css'
import {addToStack, appearPreviousPopup, hiddenPreviousPopup, isLastPopup, removeFromStack} from "./popupStack";
import { useCloseLayer } from "./useCloseLayer";
import {popupAppearAnimation, popupHideAnimation } from "../popup/popupHideAnimation";
import { verify } from "../../core/verify";


type PropsType = {
    binding: JSX.Element,
    show: boolean,
    close: () => void,
}

type PopupLayoutProps = {
    binding: JSX.Element,
    closePopup: () => void,
}


const PopupLayout = React.forwardRef<HTMLDivElement, PopupLayoutProps>((
    {
        closePopup,
        binding,
    },
    ref,
) => {
    const popupRef = ref as MutableRefObject<HTMLDivElement|null>

    useCloseLayer(
        'popup',
        popupRef,
        () => isLastPopup(popupRef) && closePopup(),
    )

    return (
        <div className={styles.popupLayer}>
            <div ref={popupRef}>
                {binding}
            </div>
        </div>
    )
})

function PopupPortal({
    show,
    binding,
    close,
}: PropsType) {
    const popupRef = useRef<HTMLDivElement|null>(null)
    const [hiddenComplete, setHiddenComplete] = useState(false)
    const [appearComplete, setAppearComplete] = useState(false)

    const closePopupWithAnimation = useCallback(async () => {
        popupRef && popupRef.current && await popupHideAnimation(popupRef.current)
        setHiddenComplete(true)
        setAppearComplete(false)
        removeFromStack()
        appearPreviousPopup()
    }, [popupRef, setAppearComplete, setHiddenComplete])

    const openPopup = useCallback(async () => {
        addToStack(popupRef)
        hiddenPreviousPopup()
            .then(() => {
                popupAppearAnimation(verify(popupRef.current))
                    .then(() => setAppearComplete(true))
            })
    }, [popupRef, setAppearComplete])

    useEffect(() => {
        if (show && popupRef.current && !appearComplete) {
            openPopup()
        }
    }, [show, popupRef])

    if (!show) {
        if (hiddenComplete) {
            return null
        }
        closePopupWithAnimation()
    }
    if (hiddenComplete) {
        setHiddenComplete(false)
    }

    return (
        <Portal parentId={'popup'}>
            <PopupLayout
                binding={binding}
                closePopup={close}
                ref={popupRef}
            />
        </Portal>
    )
}

export {
    PopupPortal,
}