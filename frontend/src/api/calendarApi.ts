import {DirectionData} from "../admin/viewModel/direction/DirectionData";
import {HallData} from "../admin/viewModel/hall/HallData";
import {TrainingData} from "../admin/viewModel/calendar/TrainingData";
import {generateUuid} from "../core/uuid/generateUuid";

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

function getMockTrainings(startDate: Date, endDate: Date): TrainingData[] {
    return [
        {
            id: '1',
            type: 'grouped',
            directionId: 'direction1',
            hallId: 'hall1',
            trainerId: 'trainer1',
            date: {
                year: 2022,
                month: 10,
                date: 8,
            },
            timeStart: {
                hour: 10,
                minutes: 0,
            },
            timeEnd: {
                hour: 11,
                minutes: 0,
            },
            clients: [],
        },
        {
            id: '2',
            type: 'individual',
            directionId: 'direction2',
            hallId: 'hall2',
            trainerId: 'trainer2',
            date: {
                year: 2022,
                month: 10,
                date: 8,
            },
            timeStart: {
                hour: 10,
                minutes: 0,
            },
            timeEnd: {
                hour: 11,
                minutes: 0,
            },
            clientId: 'client1',
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


function getHalls(): Promise<HallData[]> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(getMockHalls())
        }, 1000)
    })
}

function getTrainingsForPeriod(startDate: Date, endDate: Date): Promise<TrainingData[]> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(getMockTrainings(startDate, endDate))
        }, 1000)
    })
}

function createTraining(trainingData: Omit<TrainingData, 'id'>): Promise<{id: string}> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                id: generateUuid()
            })
        }, 1000)
    })
}

function editTraining(trainingData: TrainingData): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}

const CalendarApi = {
    getDirections,
    getHalls,
    getTrainingsForPeriod,
    createTraining,
    editTraining,
}

export {
    CalendarApi,
}