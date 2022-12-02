import { DirectionData } from "../admin/viewModel/direction/DirectionData"
import { generateUuid } from "../core/uuid/generateUuid"
import {HttpStatus} from "../core/http/HttpStatus";

type Api_Direction = {
    courseId: string,
    name: string
}

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

function createDirection(directionData: Omit<Api_Direction, 'courseId'>): Promise<{courseId: string}> {
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

function editDirection(directionData: Api_Direction): Promise<void> {
    return fetch('/edit/course', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: directionData.name,
            courseId: directionData.courseId,
        }),
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return Promise.resolve()
                default:
                    return Promise.reject(response)
            }
        })
}

function deleteDirections(directionsIds: string[]): Promise<void> {
    return fetch('/remove/courses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            courseIds: directionsIds,
        }),
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return Promise.resolve()
                default:
                    return Promise.reject(response)
            }
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