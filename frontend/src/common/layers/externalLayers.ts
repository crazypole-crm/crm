import { joinClassNames } from "../../core/styles/joinClassNames"
import { verify } from "../../core/verify"


type LayerType = 'popup'

type LayersType = {
    [item: string]: HTMLDivElement,
}

const layers: LayersType = {}
const layersOrder: Array<LayerType> = ['popup']

const layerTypeToClassname = {
    'popup': 'popup-layer',
}

function initExternalLayer(layerType: LayerType) {
    const layer = document.createElement('div')
    layer.setAttribute('id', layerType)
    layer.className = joinClassNames('external-layer', layerTypeToClassname[layerType])
    layers[layerType] = layer
    const root = verify(document.getElementById('root'))
    root.append(layer)
}

function getExternalLayer(layerType: LayerType) {
    return layers[layerType]
}

function foreachLowerLayers(layerType: LayerType, fn: (layerType: LayerType) => void) {
    const layerOrder = layersOrder.findIndex(layer => layer === layerType)
    for(let i = 0; i < layerOrder; i++)
    {
        fn(layersOrder[i])
    }
}

export {
    initExternalLayer,
    getExternalLayer,
    foreachLowerLayers,
}

export type {
    LayerType,
}