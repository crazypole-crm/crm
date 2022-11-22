import { DirectionData } from "../admin/viewModel/direction/DirectionData"
import { generateUuid } from "../core/uuid/generateUuid"
import {HttpStatus} from "../core/http/HttpStatus";

function getDirections(): Promise<DirectionData[]> {
    return fetch('/list/courses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
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

function createDirection(directionData: Omit<DirectionData, 'id'>): Promise<{courseId: string}> {
    return fetch('/create/course', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: directionData.name,
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