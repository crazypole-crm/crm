import {combine, declareAction, declareAtom} from "@reatom/core";
import {declareAtomWithSetter} from "../../../../core/reatom/declareAtomWithSetter";
import {TrainingData, TrainingDate, TrainingType} from "../TrainingData";
import {Time} from "../time";
import {createTraining} from "../createTraining";
import {verify} from "../../../../core/verify";
import {saveTraining} from "../saveTraining";

type EditTrainingPopupMode = 'edit' | 'create'

type OpenPayload = {
    mode: 'create',
    date: TrainingDate,
    timeStart: Time,
} | {
    mode: 'edit',
    trainingData: TrainingData,
}

const open = declareAction<OpenPayload>('edit.training.open')
const close = declareAction('edit.training.close')

const [openedAtom, setOpened] = declareAtomWithSetter('editTraining', false, on => [
    on(open, () => true),
    on(close, () => false),
    on(createTraining.done, () => false),
    on(saveTraining.done, () => false),
])

const modeAtom = declareAtom<EditTrainingPopupMode>('editTraining.mode', 'create', on => [
    on(open, (_, {mode}) => mode)
])

const [typeAtom, setType] = declareAtomWithSetter<TrainingType>('editTraining.type', 'grouped', on => [
    on(open, (_, value) => value.mode === 'edit' ? value.trainingData.type : 'grouped')
])

const [individualClientAtom, setIndividualClient] = declareAtomWithSetter<string|null>('editTraining.individualClient', null, on => [
    on(open, (_, value) => {
        if (value.mode === 'edit') {
            if (value.trainingData.type === 'individual') {
                return value.trainingData.clientId
            }
        }
        return null
    })
])

const trainingIdAtom = declareAtom<string | null>('editTraining.trainingId', null, on => [
    on(open, (_, value) => value.mode === 'edit' ? value.trainingData.id : null)
])

function getDefaultTrainingDate(): TrainingDate {
    const date = new Date()
    return {
        date: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
    }
}

const [trainingDateAtom, setTrainingDate] = declareAtomWithSetter<TrainingDate>('editTraining.trainingDate', getDefaultTrainingDate(), on => [
    on(open, (state, value) => {
        if (value.mode === 'create') {
            return value.date
        }
        return value.trainingData.date
    })
])

const [trainingStartTimeAtom, setTrainingStartTime] = declareAtomWithSetter<Time>('editTraining.trainingStartTime', {minutes: 0, hour: 0}, on => [
    on(open, (state, value) => {
        if (value.mode === 'create') {
            return value.timeStart
        }
        return value.trainingData.timeStart
    })
])

const [trainingEndTimeAtom, setTrainingEndTime] = declareAtomWithSetter<Time>('editTraining.trainingEndTime', {minutes: 0, hour: 0}, on => [
    on(open, (state, value) => {
        if (value.mode === 'create') {
            return {
                ...value.timeStart,
                hour: value.timeStart.hour + 1,
            }
        }
        return value.trainingData.timeEnd
    })
])

const [trainingDirectionAtom, setTrainingDirection] = declareAtomWithSetter<string|null>('editTraining.trainingDirection', null, on => [
    on(open, (_, value) => value.mode === 'edit' ? value.trainingData.directionId : null)
])

const [trainingDirectionErrorAtom, setTrainingDirectionError] = declareAtomWithSetter('editTraining.trainingDirectionError', false, on => [
    on(setTrainingDirection, () => false)
])

const [trainingHallAtom, setTrainingHall] = declareAtomWithSetter<string|null>('editTraining.trainingHall', null, on => [
    on(open, (_, value) => value.mode === 'edit' ? value.trainingData.hallId : null)
])

const [trainingHallErrorAtom, setTrainingHallError] = declareAtomWithSetter('editTraining.trainingHallError', false, on => [
    on(setTrainingHall, () => false)
])

const [trainingTrainerAtom, setTrainingTrainer] = declareAtomWithSetter<string|null>('editTraining.trainingTrainer', null, on => [
    on(open, (_, value) => value.mode === 'edit' ? value.trainingData.trainerId : null)
])

const [trainingTrainerErrorAtom, setTrainingTrainerError] = declareAtomWithSetter('editTraining.trainingTrainerError', false, on => [
    on(setTrainingTrainer, () => false)
])

function convertDescription(description?: string) {
    return description || ''
}

const [trainingDescriptionAtom, setTrainingDescription] = declareAtomWithSetter<string>('editTraining.trainingDescription', '', on => [
    on(open, (_, value) => value.mode === 'edit' ? convertDescription(value.trainingData.description) : '')
])

const [repeatableAtom, setRepeatable] = declareAtomWithSetter('editTraining.repeatable', false)

const submit = declareAction('editTraining.submit',
    (_, store) => {
        const mode = store.getState(modeAtom)
        // const trainings = store.dispatch(trainings)
        const trainingHall = store.getState(trainingHallAtom)
        const trainingId = store.getState(trainingIdAtom)
        const trainingDirection = store.getState(trainingDirectionAtom)
        const trainingTrainer = store.getState(trainingTrainerAtom)
        const trainingDate = store.getState(trainingDateAtom)
        const trainingStartTime = store.getState(trainingStartTimeAtom)
        const trainingEndTime = store.getState(trainingEndTimeAtom)
        const trainingDescription = store.getState(trainingDirectionAtom)
        const trainingType = store.getState(typeAtom)
        const trainingIndividualClient = store.getState(individualClientAtom)

        const trainingHallError = !trainingHall
        const trainingDirectionError = !trainingDirection
        const trainingTrainerError = !trainingTrainer

        store.dispatch(setTrainingHallError(trainingHallError))
        store.dispatch(setTrainingDirectionError(trainingDirectionError))
        store.dispatch(setTrainingTrainerError(trainingTrainerError))

        if (trainingTrainerError || trainingHallError || trainingTrainerError) {
            return
        }

        if (mode === 'create') {
            if (trainingType === 'grouped') {
                store.dispatch(createTraining({
                    trainingData: {
                        type: 'grouped',
                        date: trainingDate,
                        directionId: verify(trainingDirection),
                        hallId: verify(trainingHall),
                        trainerId: verify(trainingTrainer),
                        timeStart: trainingStartTime,
                        timeEnd: trainingEndTime,
                        description: trainingDescription || '',
                        clients: [],
                    }
                }))
            }
            else {
                store.dispatch(createTraining({
                    trainingData: {
                        type: 'individual',
                        date: trainingDate,
                        directionId: verify(trainingDirection),
                        hallId: verify(trainingHall),
                        trainerId: verify(trainingTrainer),
                        timeStart: trainingStartTime,
                        timeEnd: trainingEndTime,
                        description: trainingDescription || '',
                        clientId: verify(trainingIndividualClient),
                    }
                }))
            }
        }

        if (mode === 'edit') {
            if (trainingType === 'grouped') {
                store.dispatch(saveTraining({
                    trainingData: {
                        type: 'grouped',
                        date: trainingDate,
                        directionId: verify(trainingDirection),
                        hallId: verify(trainingHall),
                        trainerId: verify(trainingTrainer),
                        timeStart: trainingStartTime,
                        timeEnd: trainingEndTime,
                        clients: [],
                        description: trainingDescription || '',
                        id: verify(trainingId),
                    }
                }))
            }
            else {
                store.dispatch(saveTraining({
                    trainingData: {
                        type: 'individual',
                        date: trainingDate,
                        directionId: verify(trainingDirection),
                        hallId: verify(trainingHall),
                        trainerId: verify(trainingTrainer),
                        timeStart: trainingStartTime,
                        timeEnd: trainingEndTime,
                        clientId: verify(trainingIndividualClient),
                        description: trainingDescription || '',
                        id: verify(trainingId),
                    }
                }))
            }
        }
    }
)

const editTrainingPopupAtom = combine({
    opened: openedAtom,
    mode: modeAtom,
    trainingDate: trainingDateAtom,
    trainingStartTime: trainingStartTimeAtom,
    trainingEndTime: trainingEndTimeAtom,
    trainingDirection: trainingDirectionAtom,
    trainingDirectionError: trainingDirectionErrorAtom,
    trainingHall: trainingHallAtom,
    trainingHallError: trainingHallErrorAtom,
    trainingTrainer: trainingTrainerAtom,
    trainingTrainerError: trainingTrainerErrorAtom,
    trainingDescription: trainingDescriptionAtom,
    type: typeAtom,
    individualClient: individualClientAtom,
    repeatable: repeatableAtom,
    trainingId: trainingIdAtom,
})

const editTrainingPopupActions = {
    open,
    close,
    setTrainingDate,
    setTrainingStartTime,
    setTrainingEndTime,
    setTrainingDirection,
    setTrainingHall,
    setTrainingTrainer,
    setTrainingDescription,
    setType,
    setIndividualClient,
    setRepeatable,
    submit,
}

export {
    editTrainingPopupActions,
    editTrainingPopupAtom,
}