import {declareMapAtom} from "../../../core/reatom/declareMapAtom";
import {RegistrationData} from "../calendar/trainingClientsPopup/trainingClientsPopup";

const {
    atom: registrationsAtom,
    updateItems: updateRegistrations,
    updateItem: updateRegistration,
    removeItems: removeRegistration,
    removeAllItems: clearRegistrations,
    setNewItems: setNewRegistrations,
} = declareMapAtom<RegistrationData>(
    'registrations',
    registration => registration.trainingId,
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