import {HallData} from "../admin/viewModel/hall/HallData";

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

const HallsApi = {
    getHalls,
    createHall,
    saveHall,
    deleteHall,
}

export {
    HallsApi,
}