import {Portal} from "./Portal";
import React, {MutableRefObject, useCallback, useEffect, useRef, useState} from "react";
import styles from './PopupPortal.module.css'
import {addToStack, appearPreviousPopup, hiddenPreviousPopup, isLastPopup, removeFromStack} from "./popupStack";
import {popupAppearAnimation, popupHideAnimation} from "../popup/popupHideAnimation";
import {verify} from "../../core/verify";
import {useEventHandler} from "../../core/hooks/useEventHandler";
import {useHtmlElementEventHandler} from "../../core/hooks/useHtmlElementEventHandler";


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

    useEventHandler('mousedown', popupRef, e => {
        e.preventDefault()
    })


    useEventHandler('click', popupRef, e => {
        e.stopPropagation()
    })

    useHtmlElementEventHandler('mousedown', window, e => {
        if (!e.defaultPrevented) {
            isLastPopup(popupRef) && closePopup()
        }
    })

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
    }, [show, popupRef, appearComplete, openPopup])

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