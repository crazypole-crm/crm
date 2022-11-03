import {get, set, remove} from "local-storage";

type StorageKey = 'visible-collumns'

type StorageKeys = {
    [item: string]: StorageKey,
}

const STORAGE_KEYS: StorageKeys = {
    VISIBLE_COLLUMNS: 'visible-collumns',
}

function setValue<T>(key: StorageKey, value: T) {
    set(key, value)
}

function getValue<T>(key: StorageKey): T {
    return get(key)
}

function removeValue(key: StorageKey) {
    remove(key)
}

const LocalStorage = {
    setValue,
    getValue,
    removeValue,
}

export {
    LocalStorage,
    STORAGE_KEYS,
}