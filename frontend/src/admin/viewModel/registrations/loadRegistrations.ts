import { declareAtom } from "@reatom/core"
import { RegistrationsApi } from "../../../api/registrationsApi"
import { Toasts } from "../../../common/notification/notifications"
import { declareAsyncAction } from "../../../core/reatom/declareAsyncAction"
import { remapApiTrainingDataToTrainingData } from "../calendar/calendaActions/loadTrainingsForPeriod"
import { registrationsActions } from "./registrations"

type LoadRegistrationsForPeriodPayload = {
    userId: string,
    startDate: Date,
    endDate: Date,
}

const loadRegistrations = declareAsyncAction<LoadRegistrationsForPeriodPayload>('registrations.load',
    ({userId, startDate, endDate}, store) => {
        return RegistrationsApi.getUserRegistrationsForPeriod(userId, startDate, endDate)
            .then(registrations => {
                store.dispatch(registrationsActions.setNewRegistrations(registrations))
            })
            .catch(() => {
                Toasts.error('При получении списка записей произошла ошибка')
            })
    }
)

const registrationsLoadingAtom = declareAtom('registrations.loading', true, on => [
    on(loadRegistrations, () => true),
    on(loadRegistrations.done, () => false),
    on(loadRegistrations.fail, () => false),
])

export {
    loadRegistrations,
    registrationsLoadingAtom,
}