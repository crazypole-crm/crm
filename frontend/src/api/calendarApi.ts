import {DirectionData} from "../admin/viewModel/direction/DirectionData";
import {HallData} from "../admin/viewModel/hall/HallData";
import {generateUuid} from "../core/uuid/generateUuid";
import {HttpStatus} from "../core/http/HttpStatus";

function getMockDirections(): DirectionData[] {
    return [
        {
            id: 'direction1',
            name: 'Pole dance начинающие'
        },
        {
            id: 'direction2',
            name: 'Pole exotic'
        },
        {
            id: 'direction3',
            name: 'Йога'
        },
        {
            id: 'direction4',
            name: 'Танцы'
        }
    ]
}

function getMockHalls(): HallData[] {
    return [
        {
            id: 'hall1',
            name: 'Пилонный зал',
            capacity: 10,
        },
        {
            id: 'hall2',
            name: 'Воздушный зал',
            capacity: 6,
        },
        {
            id: 'hall3',
            name: 'Малый зал',
            capacity: 5,
        }
    ]
}

function getDirections(): Promise<DirectionData[]> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(getMockDirections())
        }, 1000)
    })
}

function createDirection(directionData: Omit<DirectionData, 'id'>): Promise<{ id: string }> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                id: 'direction5'
            })
        }, 1000)
    })
}

function saveDirection(directionData: DirectionData): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}

function deleteDirection(directionId: string): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}

function getHalls(): Promise<HallData[]> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(getMockHalls())
        }, 1000)
    })
}

function createHall(hallDat: Omit<HallData, 'id'>): Promise<{ id: string }> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                id: 'hall5'
            })
        }, 1000)
    })
}

function saveHall(hallData: HallData): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}

function deleteHall(hallId: string): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}

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

function createTraining(trainingData: Omit<Api_TrainingData, 'trainingId'>): Promise<{id: string}> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                id: generateUuid()
            })
        }, 1000)
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

    getDirections,
    createDirection,
    saveDirection,
    deleteDirection,

    getHalls,
    createHall,
    saveHall,
    deleteHall
}

export type {
    Api_TrainingData,
    Api_TrainingClients,
}

export {
    CalendarApi,
}