import {declareAtom} from "@reatom/core"
import {Toasts} from "../../../common/notification/notifications"
import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction"
import {registrationsActions} from "./registrations"
import {CalendarApi} from "../../../api/calendarApi";
import {remapApiRegistrationDataToModel} from "./remapping"

const loadRegistrations = declareAsyncAction<void>('registrations.load',
    (_, store) => {
        return CalendarApi.getUserRegistrations()
            .then(registrations => {
                const remappedRegistrations = remapApiRegistrationDataToModel(registrations)
                console.log('remappedRegistrations', remappedRegistrations)
                store.dispatch(registrationsActions.setNewRegistrations(remappedRegistrations))
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