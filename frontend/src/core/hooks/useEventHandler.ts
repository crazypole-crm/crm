import {RefObject, useEffect} from "react";


function useEventHandler(eventType: string, ref: RefObject<HTMLElement>|null, handler: (e: Event) => void) {
    useEffect(() => {
        const elements = ref && ref.current
        elements && elements.addEventListener(eventType, handler)
        return () => {
            elements && elements.removeEventListener(eventType, handler)
        }
    })
}

export {
    useEventHandler,
}