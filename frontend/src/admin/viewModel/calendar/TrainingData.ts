import {Time} from "./time";

type TrainingDate = {
    year: number,
    month: number,
    date: number,
}

type TrainingType = 'grouped' | 'individual'

type TrainingDataImpl = {
    id: string,
    directionId: string,
    trainerId: string,
    hallId: string,
    date: TrainingDate,
    timeStart: Time,
    timeEnd: Time,
    description?: string,
}

type GroupedTrainingData = TrainingDataImpl & {
    type: 'grouped',
    clients: string[],
}

type IndividualTrainingData = TrainingDataImpl & {
    type: 'individual',
    clientId: string,
}

type TrainingData = GroupedTrainingData | IndividualTrainingData

export type {
    TrainingDate,
    TrainingData,
    TrainingType,
    GroupedTrainingData,
    IndividualTrainingData,
}
