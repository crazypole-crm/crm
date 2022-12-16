import {HttpStatus} from "../core/http/HttpStatus";
import {goToUrl} from "../core/link/goToUrl";
import {Router} from "../core/router/router";

type Api_TrainingData = {
    baseTrainingId: string,
    trainingId: string,
    description?: string,
    startDate: number,
    endDate: number,
    trainerId: string,
    hallId: string,
    courseId: string,
    type: 'group' | 'individual',
    isCanceled: boolean,
    availableRegistrationsCount: number,
    maxRegistrationsCount: number,
}

function getTrainingsForPeriod(startDate: Date, endDate: Date): Promise<Api_TrainingData[]> {
    return fetch('/list/trainings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            startDate: startDate.getTime(),
            endDate: endDate.getTime(),
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

type Api_CreateTrainingData = Omit<Api_TrainingData, 'trainingId' | 'baseTrainingId' | 'isCanceled' | 'availableRegistrationsCount'> & {
    isRepeatable: boolean,
    maxRegistrationsCount: number
}

function createTraining(trainingData: Api_CreateTrainingData): Promise<void> {
    return fetch('/create/training', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            startDate: trainingData.startDate,
            endDate: trainingData.endDate,
            type: trainingData.type,
            description: trainingData.description,
            hallId: trainingData.hallId,
            courseId: trainingData.courseId,
            trainerId: trainingData.trainerId,
            isRepeatable: trainingData.isRepeatable,
        }),
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return Promise.resolve()
                case HttpStatus.BAD_REQUEST:
                    console.log('response bad request')
                    return Promise.reject(response)
                case HttpStatus.UNAUTHORIZED:
                    goToUrl(Router.Auth.url())
                    return Promise.reject(response)
                default:
                    return Promise.reject(response)
            }
        })
}

type Api_EditTraining = Omit<Api_TrainingData, 'isCanceled' | 'availableRegistrationsCount'> & {
    maxRegistrationsCount: number,
}

function editTraining(trainingData: Api_EditTraining): Promise<void> {
    return fetch('/edit/training', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            baseId: trainingData.baseTrainingId,
            trainingId: trainingData.trainingId,
            startDate: trainingData.startDate,
            endDate: trainingData.endDate,
            type: trainingData.type,
            description: trainingData.description,
            hallId: trainingData.hallId,
            courseId: trainingData.courseId,
            trainerId: trainingData.trainerId,
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

function deleteTraining(baseId: string): Promise<void> {
    return fetch('/remove/training', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            baseId,
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

type Api_TrainingRegistrations = {
    id: string,
    userId: string,
    status: 0 | 1,
}

function getTrainingRegistrations(trainingId: string): Promise<Array<Api_TrainingRegistrations>> {
    return fetch(`/training/${trainingId}/registration/list`, {
        method: 'GET',
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

function changeTrainingRegistrationStatus(registrationId: string, status: 0 | 1): Promise<Response> {
    return fetch(`/training/registration/${registrationId}/changeStatus`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            status,
        })
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return Promise.resolve(response)
                case HttpStatus.UNAUTHORIZED:
                    goToUrl(Router.Auth.url())
                    return Promise.reject(response)
                default:
                    return Promise.reject(response)
            }
        })
}

function removeTrainingRegistrationStatus(registrationId: string): Promise<Response> {
    return fetch(`/training/registration/${registrationId}/remove`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return Promise.resolve(response)
                case HttpStatus.UNAUTHORIZED:
                    goToUrl(Router.Auth.url())
                    return Promise.reject(response)
                default:
                    return Promise.reject(response)
            }
        })
}

function cancelTraining(trainingId: string): Promise<void> {
    return fetch('/edit/training/status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            trainingId,
            isCanceled: true,
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

function moveTraining(trainingId: string, startDate: number, endDate: number): Promise<void> {
    return fetch('/edit/training/time', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            trainingId,
            startDate,
            endDate,
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


function replaceTrainingTrainer(trainingId: string, trainerId: string): Promise<void> {
    return fetch('/edit/training/trainer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            trainingId,
            trainerId,
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

function createRegistration(trainingId: string, userId: string): Promise<void> {
    return fetch(`/training/${trainingId}/registration/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId,
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

function signUpToTraining(trainingId: string) {
    return fetch(`/training/${trainingId}/registration/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
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

const CalendarApi = {
    getTrainingsForPeriod,
    createTraining,
    editTraining,
    deleteTraining,
    getTrainingRegistrations,
    changeTrainingRegistrationStatus,
    removeTrainingRegistrationStatus,
    createRegistration,
    signUpToTraining,
    cancelTraining,
    moveTraining,
    replaceTrainingTrainer,
}

export type {
    Api_TrainingData,
    Api_TrainingRegistrations,
}

export {
    CalendarApi,
}