import {combine, declareAction, declareAtom} from "@reatom/core";
import {declareAtomWithSetter} from "../../../../core/reatom/declareAtomWithSetter";


type OpenPayload = {
    trainingId: string,
}

const open = declareAction<OpenPayload>('recordToTrainingPopup.open')
const close = declareAction('recordToTrainingPopup.close')

const openedAtom = declareAtom('recordToTrainingPopup.opened', false, on => [
    on(open, () => true),
    on(close, () => false),
])

const trainingIdAtom = declareAtom('recordToTrainingPopup.trainingId', '', on => [
    on(open, (_, {trainingId}) => trainingId),
])

const [selectedUserIdAtom, setSelectedUserId] = declareAtomWithSetter<string|null>('recordToTrainingPopup.selectedUserId', null, on => [
    on(open, () => null),
])

const submit = declareAction('recordToTrainingPopup.submit',
    (_, store) => {
        // const
    }
)

const recordToTrainingPopupAtom = combine({
    opened: openedAtom,
    trainingId: trainingIdAtom,
    selectedUserId: selectedUserIdAtom,
})

const recordToTrainingPopupActions = {
    close,
    open,
    setSelectedUserId,
    submit,
}

export {
    recordToTrainingPopupActions,
    recordToTrainingPopupAtom,
}
