import {Time} from "./time";

type TrainingDate = {
    year: number,
    month: number,
    date: number,
}

type TrainingType = 'grouped' | 'individual'

type TrainingData = {
    id: string,
    type: TrainingType,
    directionId: string,
    trainerId: string,
    hallId: string,
    date: TrainingDate,
    timeStart: Time,
    timeEnd: Time,
    description?: string,
}

export type {
    TrainingDate,
    TrainingData,
    TrainingType,
}
