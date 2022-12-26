import {declareMapAtom} from "../../../core/reatom/declareMapAtom";
import {DirectionData} from "./DirectionData";


const {
    atom: directionsAtom,
    updateItems: updateDirections,
    updateItem: updateDirection,
    removeItems: removeDirections,
    removeAllItems: clearDirections,
} = declareMapAtom<DirectionData>(
    'directions',
    direction => direction.id,
)

const directionsActions = {
    updateDirection,
    updateDirections,
    removeDirections,
    clearDirections,
}

export {
    directionsActions,
    directionsAtom,
}