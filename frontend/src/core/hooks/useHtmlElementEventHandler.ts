import {useEffect} from "react";

function useHtmlElementEventHandler(eventType: string, element: HTMLElement|Document|Window, handler: (e: Event) => void) {
    useEffect(() => {
        element.addEventListener(eventType, handler)
        return () => {
            element.removeEventListener(eventType, handler)
        }
    })
}

export {
    useHtmlElementEventHandler,
}