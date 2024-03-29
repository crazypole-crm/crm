import {DirectionData} from "../admin/viewModel/direction/DirectionData"
import {HttpStatus} from "../core/http/HttpStatus";
import {goToUrl} from "../core/link/goToUrl";
import { Router } from "../core/router/router";

type Api_Direction = {
    courseId: string,
    name: string,
    description: string
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
                case HttpStatus.UNAUTHORIZED:
                    goToUrl(Router.Auth.url())
                    return Promise.reject(response)
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
                case HttpStatus.UNAUTHORIZED:
                    goToUrl(Router.Auth.url())
                    return Promise.reject(response)
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
            description: directionData.description
        }),
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return Promise.resolve()
                case HttpStatus.UNAUTHORIZED:
                    goToUrl(Router.Auth.url())
                    return Promise.reject(response)
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
                case HttpStatus.UNAUTHORIZED:
                    goToUrl(Router.Auth.url())
                    return Promise.reject(response)
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