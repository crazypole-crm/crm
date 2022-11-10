import {DirectionData} from "../admin/viewModel/direction/DirectionData";
import {HallData} from "../admin/viewModel/hall/HallData";
import {TrainingData} from "../admin/viewModel/calendar/TrainingData";

function getMockDirections(): DirectionData[] {
    return [
        {
            id: '1',
            name: 'Pole dance начинающие'
        },
        {
            id: '2',
            name: 'Pole exotic'
        },
        {
            id: '3',
            name: 'Йога'
        },
        {
            id: '4',
            name: 'Танцы'
        }
    ]
}

function getMockHalls(): HallData[] {
    return [
        {
            id: '1',
            name: 'Пилонный зал',
            capacity: 10,
        },
        {
            id: '2',
            name: 'Воздушный зал',
            capacity: 6,
        },
        {
            id: '3',
            name: 'Малый зал',
            capacity: 5,
        }
    ]
}

function getMockTrainings(startDate: Date, endDate: Date): TrainingData[] {
    return [
        {
            id: '1',
            directionId: '1',
            hallId: '1',
            trainerId: '1',
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
            directionId: '1',
            hallId: '1',
            trainerId: '1',
            date: {
                year: 2022,
                month: 10,
                date: 11,
            },
            timeStart: {
                hour: 8,
                minutes: 0,
            },
            timeEnd: {
                hour: 9,
                minutes: 0,
            },
            clients: [],
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


const CalendarApi = {
    getDirections,
    getHalls,
    getTrainingsForPeriod,
}

export {
    CalendarApi,
}