import { DirectionData } from "../admin/viewModel/direction/DirectionData"
import { generateUuid } from "../core/uuid/generateUuid"

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
    createDirection,
    editDirection,
    deleteDirections,
}

export {
    DirectionsApi,
}