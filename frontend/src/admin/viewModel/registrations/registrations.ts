import {declareMapAtom} from "../../../core/reatom/declareMapAtom";
import { TrainingData } from "../calendar/TrainingData";

const {
    atom: registrationsAtom,
    updateItems: updateRegistrations,
    updateItem: updateRegistration,
    removeItems: removeRegistration,
    removeAllItems: clearRegistrations,
    setNewItems: setNewRegistrations,
} = declareMapAtom<TrainingData>(
    'registrations',
    registration => registration.id,
)

const registrationsActions = {
    updateRegistrations,
    updateRegistration,
    removeRegistration,
    clearRegistrations,
    setNewRegistrations,
}

export {
    registrationsActions,
    registrationsAtom,
}