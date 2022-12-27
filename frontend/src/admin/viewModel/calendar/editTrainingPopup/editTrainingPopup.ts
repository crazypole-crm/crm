import {combine, declareAction, declareAtom} from "@reatom/core";
import {declareAtomWithSetter} from "../../../../core/reatom/declareAtomWithSetter";
import {TrainingData, TrainingDate, TrainingType} from "../TrainingData";
import {Time} from "../time";
import {createTraining} from "../calendaActions/createTraining";
import {verify} from "../../../../core/verify";
import {saveTraining} from "../calendaActions/saveTraining";
import { isEqual } from "../../../../core/isEqual";

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

const [openedAtom] = declareAtomWithSetter('editTraining', false, on => [
    on(open, () => true),
    on(close, () => false),
    on(createTraining.done, () => false),
    on(saveTraining.done, () => false),
])

const modeAtom = declareAtom<EditTrainingPopupMode>('editTraining.mode', 'create', on => [
    on(open, (_, {mode}) => mode)
])

type PrevTrainingData =  Omit<TrainingData, 'id' | 'baseId' | 'availableRegistrationsCount' | 'isCanceled'>

function remapTrainingDataToPrevTrainingData(trainingData: TrainingData): PrevTrainingData {
    return {
        type: trainingData.type,
        directionId: trainingData.directionId,
        trainerId: trainingData.trainerId,
        hallId: trainingData.hallId,
        date: trainingData.date,
        timeStart: trainingData.timeStart,
        timeEnd: trainingData.timeEnd,
        maxRegistrationsCount: trainingData.type === 'grouped'
            ? trainingData.maxRegistrationsCount
            : undefined,
        description: trainingData.description || undefined,
    }
}

const prevTrainingDataAtom = declareAtom<PrevTrainingData|null>('editTraining.prevTrainingData', null, on => [
    on(open, (_, value) => (value.mode === 'edit' ? remapTrainingDataToPrevTrainingData(value.trainingData) : null) || null)
])

const [typeAtom, setType] = declareAtomWithSetter<TrainingType>('editTraining.type', 'grouped', on => [
    on(open, (_, value) => value.mode === 'edit' ? value.trainingData.type : 'grouped')
])

const trainingIdAtom = declareAtom<string | null>('editTraining.trainingId', null, on => [
    on(open, (_, value) => value.mode === 'edit' ? value.trainingData.id : null)
])

const baseIdAtom = declareAtom<string | null>('editTraining.baseId', null, on => [
    on(open, (_, value) => value.mode === 'edit' ? value.trainingData.baseId : null)
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

const [trainingPeriodTimeErrorAtom, setTrainingPeriodTimeError] = declareAtomWithSetter('editTraining.trainingPeriodTimeError', false, on => [
    on(setTrainingEndTime, () => false),
    on(setTrainingStartTime, () => false),
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

function convertCapacity(maxRegistrationsCount?: number) {
    return maxRegistrationsCount || null
}

const [trainingCapacityAtom, setTrainingCapacity] = declareAtomWithSetter<number|null>('editTraining.trainingCapacity', null, on => [
    on(open, (_, value) => value.mode === 'edit' ? convertCapacity(value.trainingData.maxRegistrationsCount) : null)
])

const [trainingCapacityErrorAtom, setTrainingCapacityError] = declareAtomWithSetter('editTraining.trainingCapacityError', false, on => [
    on(setTrainingCapacity, () => false)
])

function convertDescription(description?: string) {
    return description || ''
}

const [trainingDescriptionAtom, setTrainingDescription] = declareAtomWithSetter<string>('editTraining.trainingDescription', '', on => [
    on(open, (_, value) => value.mode === 'edit' ? convertDescription(value.trainingData.description) : '')
])

const [repeatableAtom, setRepeatable] = declareAtomWithSetter('editTraining.repeatable', false)

const submitButtonLoadingAtom = declareAtom('editTraining.submitButtonLoading', false, on => [
    on(createTraining, () => true),
    on(createTraining.done, () => false),
    on(createTraining.fail, () => false),
    on(saveTraining, () => true),
    on(saveTraining.done, () => false),
    on(saveTraining.fail, () => false),
    on(close, () => false),
])

const submit = declareAction('editTraining.submit',
    (_, store) => {
        const mode = store.getState(modeAtom)
        const type = store.getState(typeAtom)
        const trainingHall = store.getState(trainingHallAtom)
        const trainingId = store.getState(trainingIdAtom)
        const baseId = store.getState(baseIdAtom)
        const trainingDirection = store.getState(trainingDirectionAtom)
        const trainingTrainer = store.getState(trainingTrainerAtom)
        const trainingDate = store.getState(trainingDateAtom)
        const trainingStartTime = store.getState(trainingStartTimeAtom)
        const trainingEndTime = store.getState(trainingEndTimeAtom)
        const trainingDescription = store.getState(trainingDescriptionAtom)
        const trainingCapacity = store.getState(trainingCapacityAtom)
        const repeatable = store.getState(repeatableAtom)

        const trainingHallError = !trainingHall
        const trainingDirectionError = !trainingDirection
        const trainingTrainerError = !trainingTrainer
        const trainingCapacityError = type === 'grouped' && !trainingCapacity
        const trainingPeriodTimeError = trainingStartTime.hour > trainingEndTime.hour
            || (trainingStartTime.hour === trainingEndTime.hour && trainingStartTime.minutes > trainingEndTime.minutes)

        store.dispatch(setTrainingHallError(trainingHallError))
        store.dispatch(setTrainingDirectionError(trainingDirectionError))
        store.dispatch(setTrainingTrainerError(trainingTrainerError))
        store.dispatch(setTrainingCapacityError(trainingCapacityError))
        store.dispatch(setTrainingPeriodTimeError(trainingPeriodTimeError))

        if (trainingDirectionError || trainingHallError || trainingTrainerError || trainingCapacityError || trainingPeriodTimeError) {
            return
        }

        if (mode === 'create') {
            store.dispatch(createTraining({
                type,
                date: trainingDate,
                directionId: trainingDirection,
                hallId: trainingHall,
                trainerId: trainingTrainer,
                timeStart: trainingStartTime,
                timeEnd: trainingEndTime,
                description: trainingDescription || undefined,
                isRepeatable: repeatable,
                maxRegistrationsCount: type === 'grouped'
                    ? verify(trainingCapacity)
                    : undefined,
            }))
        }

        if (mode === 'edit' && trainingId) {
            const prevTrainingData =  store.getState(prevTrainingDataAtom)
            if (isEqual(prevTrainingData, {
                type: type,
                directionId: trainingDirection,
                trainerId: trainingTrainer,
                hallId: trainingHall,
                date: trainingDate,
                timeStart: trainingStartTime,
                timeEnd: trainingEndTime,
                maxRegistrationsCount: type === 'grouped'
                    ? verify(trainingCapacity)
                    : undefined,
                description: trainingDescription || undefined,
            })) {
                store.dispatch(close())
                return
            }
            
            store.dispatch(saveTraining({
                type: type,
                date: trainingDate,
                directionId: trainingDirection,
                hallId: trainingHall,
                trainerId: trainingTrainer,
                timeStart: trainingStartTime,
                timeEnd: trainingEndTime,
                description: trainingDescription || undefined,
                id: trainingId,
                baseId: verify(baseId),
                maxRegistrationsCount: type === 'grouped'
                    ? verify(trainingCapacity)
                    : undefined,
            }))
        }
    }
)

const editTrainingPopupAtom = combine({
    opened: openedAtom,
    mode: modeAtom,
    prevTrainingData: prevTrainingDataAtom,
    trainingDate: trainingDateAtom,
    trainingStartTime: trainingStartTimeAtom,
    trainingEndTime: trainingEndTimeAtom,
    trainingDirection: trainingDirectionAtom,
    trainingDirectionError: trainingDirectionErrorAtom,
    trainingHall: trainingHallAtom,
    trainingHallError: trainingHallErrorAtom,
    trainingTrainer: trainingTrainerAtom,
    trainingTrainerError: trainingTrainerErrorAtom,
    trainingCapacity: trainingCapacityAtom,
    trainingCapacityError: trainingCapacityErrorAtom,
    trainingDescription: trainingDescriptionAtom,
    trainingPeriodTimeError: trainingPeriodTimeErrorAtom,
    type: typeAtom,
    repeatable: repeatableAtom,
    trainingId: trainingIdAtom,
    baseId: baseIdAtom,
    submitButtonLoading: submitButtonLoadingAtom,
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
    setTrainingCapacity,
    setType,
    setRepeatable,
    submit,
}

export {
    editTrainingPopupActions,
    editTrainingPopupAtom,
}