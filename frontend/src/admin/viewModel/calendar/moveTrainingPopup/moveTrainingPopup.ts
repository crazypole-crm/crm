import {combine, declareAction, declareAtom} from "@reatom/core";
import {TrainingDate} from "../TrainingData";
import {declareAtomWithSetter} from "../../../../core/reatom/declareAtomWithSetter";
import {Time} from "../time";

type OpenPayload = {
    id: string
    date: TrainingDate,
    startTime: Time,
    endTime: Time,
}

const open = declareAction<OpenPayload>('moveTrainingPopup.open')
const close = declareAction('moveTrainingPopup.close')

const openedAtom = declareAtom('moveTrainingPopup.opened', false, on => [
    on(open, () => true),
    on(close, () => false),
])

const trainingIdAtom = declareAtom('moveTrainingPopup.trainingId', '', on => [
    on(open, (_, {id}) => id),
])

function getDefaultTrainingDate(): TrainingDate {
    const date = new Date()
    return {
        date: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
    }
}

const [trainingDateAtom, setTrainingDate] = declareAtomWithSetter<TrainingDate>('moveTrainingPopup.trainingDate', getDefaultTrainingDate(), on => [
    on(open, (state, {date}) => date)
])

const [trainingStartTimeAtom, setTrainingStartTime] = declareAtomWithSetter<Time>('moveTrainingPopup.trainingStartTime', {minutes: 0, hour: 0}, on => [
    on(open, (state, {startTime}) => startTime)
])

const [trainingEndTimeAtom, setTrainingEndTime] = declareAtomWithSetter<Time>('moveTrainingPopup.trainingEndTime', {minutes: 0, hour: 0}, on => [
    on(open, (state, {endTime}) => endTime)
])

const [repeatAtom, setRepeat] = declareAtomWithSetter('moveTrainingPopup.repeat', false)

const submit = declareAction('moveTrainingPopup.submit',
    (_, store) => {
        const trainingDate = store.getState(trainingDateAtom)
        const trainingStartTime = store.getState(trainingStartTimeAtom)
        const trainingEndTime = store.getState(trainingEndTimeAtom)

        console.log('submit move training')
    }
)

const moveTrainingPopupAtom = combine({
    opened: openedAtom,
    trainingId: trainingIdAtom,
    trainingDate: trainingDateAtom,
    trainingStartTime: trainingStartTimeAtom,
    trainingEndTime: trainingEndTimeAtom,
    repeat: repeatAtom,
})

const moveTrainingPopupActions = {
    open,
    close,
    setTrainingDate,
    setTrainingStartTime,
    setTrainingEndTime,
    setRepeat,
    submit,
}

export {
    moveTrainingPopupAtom,
    moveTrainingPopupActions,
}