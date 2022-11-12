import {RefObject} from "react";
import { useHtmlElementEventHandler } from "../../core/hooks/useHtmlElementEventHandler";
import {foreachLowerLayers, getExternalLayer, LayerType } from "../layers/externalLayers";

function checkClickInLayer(target: Node, popupRef: RefObject<HTMLDivElement|null>, layer: LayerType): boolean {
    const popup = popupRef.current
    const popupLayer = getExternalLayer(layer)
    if (popupLayer && popup) {
        const isPopover = popupLayer.contains(target)
        const compareResult = target.compareDocumentPosition(popup)
        if (!(compareResult & Node.DOCUMENT_POSITION_CONTAINS)) {
            if (!isPopover || compareResult & Node.DOCUMENT_POSITION_FOLLOWING) {
                return false
            }
        }
    }
    return true
}

function useCloseLayer(layerType: LayerType, popupRef: RefObject<HTMLDivElement|null>, onClose: () => void) {
    useHtmlElementEventHandler('mousedown', document,  e => {
        const target = e.target as Node
        let mustClose = true
        foreachLowerLayers(
            layerType,
            (layer) => {
                if (checkClickInLayer(target, popupRef, layer)) {
                    mustClose = false
                }
            }
        )
        if (mustClose && !checkClickInLayer(target, popupRef, layerType)) {
            onClose()
        }
    })
}

export {
    useCloseLayer,
}
