import {combine, declareAction, declareAtom} from "@reatom/core";
import {declareAtomWithSetter} from "../../../../core/reatom/declareAtomWithSetter";
import {Api_TrainingClients, CalendarApi} from "../../../../api/calendarApi";

type OpenPayload = {
    id: string,
}

function remapApiTrainingClientsDate(clientsData: Api_TrainingClients) {
    const clientsMap = new Map<string, boolean>()
    Object.keys(clientsData).forEach(clientId => {
        clientsMap.set(clientId, clientsData[clientId])
    })
    return clientsMap
}

const open = declareAction<OpenPayload>('clientTrainingPopup.open',
    ({id}, store) => {
        store.dispatch(setClientsLoading(true))
        return CalendarApi.getTrainingClients(id)
            .then(clientsData => {
                const clientsMap = remapApiTrainingClientsDate(clientsData)
                store.dispatch(setClientsData(clientsMap))
                store.dispatch(setClientsLoading(false))
            })
    }
)
const close = declareAction('clientTrainingPopup.close')

const openedAtom = declareAtom('clientTrainingPopup.opened', false, on => [
    on(open, () => true),
    on(close, () => false),
])

const trainingIdAtom = declareAtom('clientTrainingPopup.trainingId', '', on => [
    on(open, (_, {id}) => id),
])

const markClientAttendance = declareAction<{clientId: string, attendance: boolean}>('clientTrainingPopup.markClientAttendance')

const [clientsDataAtom, setClientsData] = declareAtomWithSetter<Map<string, boolean>>('clientTrainingPopup.clientsData', new Map(), on => [
    on(open, () => new Map()),
    on(markClientAttendance, (state, {clientId, attendance}) => {
        const newState = new Map(state)
        state.set(clientId, attendance)
        return newState
    })
])

const [clientsLoadingAtom, setClientsLoading] = declareAtomWithSetter<boolean>('clientTrainingPopup.clientsLoading', true)

const submit = declareAction('trainingActionPopup.submit',
    (_, store) => {
        const clientsData = store.getState(clientsDataAtom)
        console.log('submit clientsData', clientsData)
    }
)

const clientsTrainingPopupAtom = combine({
    opened: openedAtom,
    trainingId: trainingIdAtom,
    clientsData: clientsDataAtom,
    clientsLoading: clientsLoadingAtom,
})

const clientsTrainingPopupActions = {
    open,
    close,
    markClientAttendance,
    submit,
    setClientsData,
    setClientsLoading,
}

export {
    clientsTrainingPopupActions,
    clientsTrainingPopupAtom,
}
