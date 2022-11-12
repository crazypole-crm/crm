import {get, set, remove} from "local-storage";

type StorageKey = 'visible-collumns' | 'calendar-day-start-time' | 'calendar-day-end-time' | 'calendar-step-time'

type StorageKeys = {
    [item: string]: StorageKey,
}

const STORAGE_KEYS: StorageKeys = {
    VISIBLE_COLLUMNS: 'visible-collumns',
    CALENDAR_DAY_START_TIME: 'calendar-day-start-time',
    CALENDAR_DAY_END_TIME: 'calendar-day-end-time',
    CALENDAR_STEP_TIME: 'calendar-step-time',
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