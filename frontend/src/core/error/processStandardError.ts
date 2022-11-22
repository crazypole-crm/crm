import { Toasts } from "../../common/notification/notifications";
import {I18n_get} from "../../i18n/i18n_get";

function processStandardError(error?: any) {
    Toasts.error('Упс, что-то пошло не так')
}

export {
    processStandardError,
}