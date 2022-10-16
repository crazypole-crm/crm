import {TFunction} from "i18next";

let t: TFunction|null = null

function I18n_get(messageId: string, options: Object = {}) {
    if (!t) {
        throw new Error('t function is not initialized')
    }
    return t(messageId, options);
}


function setTranslationFunction(fn: TFunction) {
    t = fn
}


export {
    setTranslationFunction,
    I18n_get,
}