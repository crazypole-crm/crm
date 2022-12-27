import {declareMapAtom} from "../../../core/reatom/declareMapAtom";
import { UserRegistrationData } from "./UserRegistrationData";

const {
    atom: registrationsAtom,
    updateItems: updateRegistrations,
    updateItem: updateRegistration,
    removeItems: removeRegistration,
    removeAllItems: clearRegistrations,
    setNewItems: setNewRegistrations,
} = declareMapAtom<UserRegistrationData>(
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