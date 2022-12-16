import {combine, declareAction, declareAtom} from "@reatom/core";
import { deleteTraining } from "../calendaActions/deleteTraining";
import {TrainingData} from "../TrainingData";
import {cancelTraining} from "../calendaActions/cancelTraining";
import {signUpToTraining} from "../calendaActions/signUpToTraining";

type ModeType = 'record' | 'cancel' | 'delete'

type OpenPayload = TrainingData & {
    mode: ModeType,
}

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
])

const modeAtom = declareAtom<ModeType>('trainingActionPopup.modeAtom', 'record', on => [
    on(open, (_, {mode}) => mode),
])

const trainingDataAtom = declareAtom<TrainingData>('trainingActionPopup.trainingDataAtom', {} as TrainingData, on => [
    on(open, (_, trainingData) => ({...trainingData})),
])

const submit = declareAction('trainingActionPopup.submit',
    (_, store) => {
        const mode = store.getState(modeAtom)
        const {baseId, id} = store.getState(trainingDataAtom)

        if (mode === 'record') {
            store.dispatch(signUpToTraining(id))
        }
        else if (mode === 'cancel') {
            store.dispatch(cancelTraining(id))
        }
        else if (mode === 'delete') {
            store.dispatch(deleteTraining(baseId))
        }
    }
)

const trainingActionPopupAtom = combine({
    mode: modeAtom,
    trainingData: trainingDataAtom,
    opened: openedAtom,
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