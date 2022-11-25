import {HallData} from "../admin/viewModel/hall/HallData";
import {HttpStatus} from "../core/http/HttpStatus";

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
                default:
                    return Promise.reject(response)
            }
        })
}

function createHall(hallData: Omit<HallData, 'id'>): Promise<{ hallId: string }> {
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
                default:
                    return Promise.reject(response)
            }
        })
}

function saveHall(hallData: HallData): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}

function deleteHalls(hallIds: string[]): Promise<void> {
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
    deleteHalls,
}

export {
    HallsApi,
}