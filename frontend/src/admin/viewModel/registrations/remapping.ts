import {Api_TrainingRegistrations} from "../../../api/calendarApi";
import {RegistrationData} from "../calendar/trainingClientsPopup/trainingClientsPopup";


function remapApiRegistrationDataToModel(apiRegistrationsData: Array<Api_TrainingRegistrations>): Array<RegistrationData> {
    return apiRegistrationsData.map(registration => ({
        id: registration.id,
        userId: registration.userId,
        attended: !!registration.status,
        trainingId: registration.trainingId,
    }))
}

export {
    remapApiRegistrationDataToModel,
}