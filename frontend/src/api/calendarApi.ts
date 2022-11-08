import {DirectionData} from "../admin/viewModel/direction/DirectionData";
import {HallData} from "../admin/viewModel/hall/HallData";

function getMockDirections(): DirectionData[] {
    return [
        {
            id: '1',
            name: 'Pole dance'
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


const CalendarApi = {
    getDirections,
    getHalls,
}

export {
    CalendarApi,
}