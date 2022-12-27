import {combine, declareAction, declareAtom} from "@reatom/core";
import { deleteTraining } from "../calendaActions/deleteTraining";
import {TrainingData} from "../TrainingData";
import {cancelTraining} from "../calendaActions/cancelTraining";
import {signUpToTraining} from "../calendaActions/signUpToTraining";
import { unsubscribeTraining } from "../../registrations/popups/unsubscribeTraining";

type ModeType = 'record' | 'cancel' | 'delete' | 'unsubscribe'

type OpenPayload = TrainingData & ({
    mode: 'record' | 'cancel' | 'delete' ,
} | {
    mode: 'unsubscribe',
    registrationId: string
})

const open = declareAction<OpenPayload>('trainingActionPopup.open')
const close = declareAction('trainingActionPopup.close')

const openedAtom = declareAtom('trainingActionPopup.opened', false, on => [
    on(open, () => true),
    on(close, () => false),
    on(deleteTraining.done, () => false),
    on(deleteTraining.fail, () => false),
    on(signUpToTraining.done, () => false),
    on(signUpToTraining.fail, () => false),
    on(cancelTraining.done, () => false),
    on(cancelTraining.fail, () => false),
    on(unsubscribeTraining.done, () => false),
    on(unsubscribeTraining.fail, () => false),
])

const modeAtom = declareAtom<ModeType>('trainingActionPopup.modeAtom', 'record', on => [
    on(open, (_, {mode}) => mode),
])

const trainingDataAtom = declareAtom<TrainingData>('trainingActionPopup.trainingDataAtom', {} as TrainingData, on => [
    on(open, (_, trainingData) => ({...trainingData})),
])

const registrationIdAtom = declareAtom<string|null>('trainingActionPopup.registrationIdAtom', null, on => [
    on(open, (_, value) => value.mode === 'unsubscribe' ? value.registrationId : null),
])

const submitButtonLoadingAtom = declareAtom('trainingActions.submitButtonLoading', false, on => [
    on(deleteTraining, () => true),
    on(deleteTraining.done, () => false),
    on(deleteTraining.fail, () => false),
    on(cancelTraining, () => true),
    on(cancelTraining.done, () => false),
    on(cancelTraining.fail, () => false),
    on(signUpToTraining, () => true),
    on(signUpToTraining.done, () => false),
    on(signUpToTraining.fail, () => false),
    on(unsubscribeTraining, () => true),
    on(unsubscribeTraining.done, () => false),
    on(unsubscribeTraining.fail, () => false),
    on(close, () => false),
])

const submit = declareAction('trainingActionPopup.submit',
    (_, store) => {
        const mode = store.getState(modeAtom)
        const {baseId, id} = store.getState(trainingDataAtom)
        const registrationId = store.getState(registrationIdAtom)

        if (mode === 'record') {
            store.dispatch(signUpToTraining(id))
        }
        else if (mode === 'cancel') {
            store.dispatch(cancelTraining(id))
        }
        else if (mode === 'delete') {
            store.dispatch(deleteTraining(baseId))
        }
        else if (registrationId && mode === 'unsubscribe') {
            store.dispatch(unsubscribeTraining(registrationId))
        }
    }
)

const trainingActionPopupAtom = combine({
    mode: modeAtom,
    trainingData: trainingDataAtom,
    registrationId: registrationIdAtom,
    opened: openedAtom,
    submitButtonLoading: submitButtonLoadingAtom,
})

const trainingActionPopupActions = {
    open,
    close,
    submit,
}

export {
    trainingActionPopupActions,
    trainingActionPopupAtom,
}