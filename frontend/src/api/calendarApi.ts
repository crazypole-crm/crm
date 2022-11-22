import {HttpStatus} from "../core/http/HttpStatus";

type Api_TrainingData = {
    trainingId: string,
    description?: string,
    startDate: number,
    endDate: number,
    trainerId: string,
    hallId: string,
    courseId: string,
    type: 'group' | 'individual'
}

function getTrainingsForPeriod(startDate: Date, endDate: Date): Promise<Api_TrainingData[]> {
    return fetch('/list/trainings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            startDate: startDate.getTime(),
            endDate: endDate.getTime(),
        }),
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return Promise.resolve(response.json())
                default:
                    return Promise.reject(response)
            }
        })

}

function createTraining(trainingData: Omit<Api_TrainingData, 'trainingId'>): Promise<{trainingId: string}> {
    return fetch('/create/training', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            startDate: trainingData.startDate,
            endDate: trainingData.endDate,
            type: trainingData.type,
            description: trainingData.description,
            hallId: trainingData.hallId,
            courseId: trainingData.courseId,
            trainerId: trainingData.trainerId,
        }),
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return Promise.resolve(response.json())
                default:
                    return Promise.reject(response)
            }
        })
}

function editTraining(trainingData: Api_TrainingData): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}

function deleteTraining(trainingId: string): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}

type Api_TrainingClients = {
    [item: string]: boolean
}

function getTrainingClients(trainingId: string): Promise<Api_TrainingClients> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                'client1': false,
                'client2': false,
                'client3': false,
            })
        }, 1000)
    })
}

function cancelTraining(trainingId: string): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}

function moveTraining(trainingId: string, startDate: number, endDate: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}


function replaceTrainingTrainer(trainingId: string, trainerId: string): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}

const CalendarApi = {
    getTrainingsForPeriod,
    createTraining,
    editTraining,
    deleteTraining,
    getTrainingClients,
    cancelTraining,
    moveTraining,
    replaceTrainingTrainer,
}

export type {
    Api_TrainingData,
    Api_TrainingClients,
}

export {
    CalendarApi,
}