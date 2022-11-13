import {combine, declareAction, declareAtom} from "@reatom/core";

type OpenPayload = {
    id: string,
    clients: Map<string, boolean>,
}

const open = declareAction<OpenPayload>('clientTrainingPopup.open')
const close = declareAction('clientTrainingPopup.close')

const openedAtom = declareAtom('clientTrainingPopup.opened', false, on => [
    on(open, () => true),
    on(close, () => false),
])

const trainingIdAtom = declareAtom('clientTrainingPopup.trainingId', '', on => [
    on(open, (_, {id}) => id),
])

const markClientAttendance = declareAction<{clientId: string, attendance: boolean}>('clientTrainingPopup.markClientAttendance')

const clientsDataAtom = declareAtom<Map<string, boolean>>('clientTrainingPopup.clientsData', new Map(), on => [
    on(open, (_, {clients}) => clients),
    on(markClientAttendance, (state, {clientId, attendance}) => {
        const newState = new Map(state)
        state.set(clientId, attendance)
        return newState
    })
])

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
})

const clientsTrainingPopupActions = {
    open,
    close,
    markClientAttendance,
    submit,
}

export {
    clientsTrainingPopupActions,
    clientsTrainingPopupAtom,
}
