import { DirectionData } from "../admin/viewModel/direction/DirectionData"
import { generateUuid } from "../core/uuid/generateUuid"

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

function getDirections(): Promise<DirectionData[]> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(getMockDirections())
        }, 1000)
    })
}

function createDirection(trainingData: Omit<DirectionData, 'id'>): Promise<{id: string}> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                id: generateUuid()
            })
        }, 1000)
    })
}

function editDirection(directionData: DirectionData): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}

function deleteDirections(directionsIds: string[]): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}

const DirectionsApi = {
    getDirections,
    createDirection,
    editDirection,
    deleteDirections,
}

export {
    DirectionsApi,
}