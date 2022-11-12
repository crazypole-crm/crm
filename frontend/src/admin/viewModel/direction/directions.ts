import {declareMapAtom} from "../../../core/reatom/declareMapAtom";
import {DirectionData} from "./DirectionData";


const {
    atom: directionsAtom,
    updateItems: updateDirections,
    updateItem: updateDirection,
    removeItems: removeDirection,
} = declareMapAtom<DirectionData>(
    'directions',
    direction => direction.id,
)

const directionsActions = {
    updateDirection,
    updateDirections,
    removeDirection,
}

export {
    directionsActions,
    directionsAtom,
}