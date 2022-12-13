import {HallData} from "../admin/viewModel/hall/HallData";
import {HttpStatus} from "../core/http/HttpStatus";
import {goToUrl} from "../core/link/goToUrl";
import { Router } from "../core/router/router";

type Api_HallData = {
    hallId: string,
    name: string,
    capacity: number,
}

function getHalls(): Promise<HallData[]> {
    return fetch('/list/halls', {
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

function createHall(hallData: Omit<Api_HallData, 'hallId'>): Promise<{ hallId: string }> {
    return fetch('/create/hall', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: hallData.name,
            capacity: hallData.capacity
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

function saveHall(hallData: Api_HallData): Promise<void> {
    return fetch('/edit/hall', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            hallId: hallData.hallId,
            name: hallData.name,
            capacity: hallData.capacity
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

function deleteHalls(hallIds: string[]): Promise<void> {
    return fetch('/remove/halls', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            hallsIds: hallIds,
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

const HallsApi = {
    getHalls,
    createHall,
    saveHall,
    deleteHalls,
}

export {
    HallsApi,
}