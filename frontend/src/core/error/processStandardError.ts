import {Toasts} from "../../common/notification/notifications";

function processStandardError(error?: any) {
    Toasts.error('Упс, что-то пошло не так')
}

export {
    processStandardError,
}