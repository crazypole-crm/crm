import {Time} from "./time";

type TrainingDate = {
    year: number,
    month: number,
    date: number,
}

type TrainingType = 'grouped' | 'individual'

type TrainingData = {
    baseId: string,
    id: string,
    type: TrainingType,
    directionId: string,
    trainerId: string,
    hallId: string,
    date: TrainingDate,
    timeStart: Time,
    timeEnd: Time,
    isCanceled: boolean,
    availableRegistrationsCount: number,
    maxRegistrationsCount: number,
    description?: string,
}

export type {
    TrainingDate,
    TrainingData,
    TrainingType,
}
