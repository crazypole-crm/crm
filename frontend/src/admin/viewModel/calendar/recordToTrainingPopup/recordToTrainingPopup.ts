import {combine, declareAction, declareAtom} from "@reatom/core";
import {declareAtomWithSetter} from "../../../../core/reatom/declareAtomWithSetter";
import {createRegistration} from "../calendaActions/createRegistration";
import {verify} from "../../../../core/verify";
import {clientsTrainingPopupActions} from "../trainingClientsPopup/trainingClientsPopup";
import {dispatchAsyncAction} from "../../../../core/reatom/dispatchAsyncAction";


type OpenPayload = {
    trainingId: string,
    fromClientsPopup?: boolean,
}

const open = declareAction<OpenPayload>('recordToTrainingPopup.open')
const close = declareAction('recordToTrainingPopup.close',
    (_, store) => {
        const trainingId = store.getState(trainingIdAtom)
        const fromClientsPopup = store.getState(fromClientsPopupAtom)
        if (fromClientsPopup) {
            store.dispatch(clientsTrainingPopupActions.open({
                id: trainingId,
            }))
        }
    }
)

const openedAtom = declareAtom('recordToTrainingPopup.opened', false, on => [
    on(open, () => true),
    on(close, () => false),
])

const fromClientsPopupAtom = declareAtom('recordToTrainingPopup.fromClientsPopupAtom', false, on => [
    on(open, (_, {fromClientsPopup = false}) => fromClientsPopup)
])

const trainingIdAtom = declareAtom('recordToTrainingPopup.trainingId', '', on => [
    on(open, (_, {trainingId}) => trainingId),
])

const [selectedUserIdAtom, setSelectedUserId] = declareAtomWithSetter<string|null>('recordToTrainingPopup.selectedUserId', null, on => [
    on(open, () => null),
])
const [selectedUserIdErrorAtom, setSelectedUserIdError] = declareAtomWithSetter<string>('recordToTrainingPopup.selectedUserIdError', '', on => [
    on(setSelectedUserId, () => ''),
])

const submitButtonLoadingAtom = declareAtom<boolean>('recordToTrainingPopup.submitButtonLoading', false, on => [
    on(open, () => false),
    on(createRegistration, () => true),
    on(createRegistration.done, () => false),
    on(createRegistration.fail, () => false),
])

const submit = declareAction('recordToTrainingPopup.submit',
    (_, store) => {
        const trainingId = store.getState(trainingIdAtom)
        const selectedUserId = store.getState(selectedUserIdAtom)

        store.dispatch(setSelectedUserIdError(selectedUserId ? '' : 'Поле пользователь обязательное!'))

        const selectedUserIdError = store.getState(selectedUserIdErrorAtom)

        if (selectedUserIdError) {
            return
        }

        dispatchAsyncAction(store, createRegistration, {
            trainingId,
            userId: verify(selectedUserId),
        })
            .then(() => store.dispatch(close()))
    }
)

const recordToTrainingPopupAtom = combine({
    opened: openedAtom,
    trainingId: trainingIdAtom,
    selectedUserId: selectedUserIdAtom,
    selectedUserIdError: selectedUserIdErrorAtom,
    submitButtonLoading: submitButtonLoadingAtom,
    fromClientsPopup: fromClientsPopupAtom,
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
