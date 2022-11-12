import {Time} from "./time";

type TrainingDate = {
    year: number,
    month: number,
    date: number,
}

type TrainingData = {
    id: string,
    directionId: string,
    trainerId: string,
    hallId: string,
    date: TrainingDate,
    timeStart: Time,
    timeEnd: Time,
    description?: string,
    clients: string[],
}

export type {
    TrainingDate,
    TrainingData,
}
