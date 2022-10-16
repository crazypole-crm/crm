import {i18n} from "i18next";
import {LocalStorage, STORAGE_KEYS} from "../core/localStorage/localStorage";

type LanguageType = 'ru' | 'en'

const LANGUAGE = {
    RU: 'ru',
    EN: 'en',
}

let i18nFn: i18n|null = null

function changeLanguage(language: LanguageType) {
    if (!i18nFn) {
        throw new Error('i18n function is not initialized')
    }
    i18nFn.changeLanguage(language)
        .then(() => {
            LocalStorage.setValue<string>(STORAGE_KEYS.LANGUAGE, language)
        })
}

function getLanguage(): LanguageType {
    return LocalStorage.getValue<LanguageType>(STORAGE_KEYS.LANGUAGE) || LANGUAGE.RU
}

function setI18n(fn: i18n) {
    i18nFn = fn
}

export type {
    LanguageType,
}

export {
    setI18n,
    changeLanguage,
    getLanguage,
    LANGUAGE,
}