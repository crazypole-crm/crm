import {HttpStatus} from "../core/http/HttpStatus";

function registration(email: string, password: string): Promise<Response> {
    return fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password,
            email,
        }),
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return Promise.resolve(response)
                default:
                    return Promise.reject(response)
            }
        })
}

function logIn(email: string, password: string): Promise<Response> {
    return fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })
        .then(response => {
            switch (response.status) {
                case HttpStatus.OK:
                    return Promise.resolve(response)
                default:
                    return Promise.reject(response)
            }
        })
}

function logOut(): Promise<Response> {
    return fetch('/logout', {
        method: 'POST',
    })
}

const AuthenticationApi = {
    logIn,
    logOut,
    registration,
};

export {
    AuthenticationApi,
}