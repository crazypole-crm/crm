import {HttpStatus} from "../core/http/HttpStatus";
import {goToUrl} from "../core/link/goToUrl";
import {Router} from "../core/router/router";


function sendCustomNotification(role: number, title: string, body: string) {
    return fetch('/notify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            role,
            title,
            body,
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

const NotificationsApi = {
    sendCustomNotification,
}

export {
    NotificationsApi,
}