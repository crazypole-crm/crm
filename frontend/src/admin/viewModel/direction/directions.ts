import {declareMapAtom} from "../../../core/reatom/declareMapAtom";
import {DirectionData} from "./DirectionData";


const {
    atom: directionsAtom,
    updateItems: updateDirections,
    updateItem: updateDirection,
    removeItems: removeDirections,
} = declareMapAtom<DirectionData>(
    'directions',
    direction => direction.id,
)

const directionsActions = {
    updateDirection,
    updateDirections,
    removeDirections,
}

export {
    directionsActions,
    directionsAtom,
}