import {combine, declareAction, declareAtom} from "@reatom/core";
import {TrainingData} from "../TrainingData";

type ModeType = 'record' | 'cancel' | 'delete'

type OpenPayload = TrainingData & {
    mode: ModeType,
}

const open = declareAction<OpenPayload>('trainingActionPopup.open')
const close = declareAction('trainingActionPopup.close')

const openedAtom = declareAtom('trainingActionPopup.opened', false, on => [
    on(open, () => true),
    on(close, () => false),
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

        if (mode === 'record') {
            console.log('record to training')
        }
        else if (mode === 'cancel') {
            console.log('cancel training')
        }
        else if (mode === 'delete') {
            console.log('delete training')
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