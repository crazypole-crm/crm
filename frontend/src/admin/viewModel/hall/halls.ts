import {declareMapAtom} from "../../../core/reatom/declareMapAtom";
import {HallData} from "./HallData";

const {
    atom: hallsAtom,
    updateItems: updateHalls,
    updateItem: updateHall,
    removeItems: removeHall,
    removeAllItems: clearHalls,
} = declareMapAtom<HallData>(
    'halls',
    hall => hall.id,
)

const hallsActions = {
    updateHalls,
    updateHall,
    removeHall,
    clearHalls,
}

export {
    hallsActions,
    hallsAtom,
}