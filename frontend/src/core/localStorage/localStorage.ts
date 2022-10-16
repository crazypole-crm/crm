import {get, set, remove} from "local-storage";

type StorageKey = 'calendarDefaultView'
    | 'redirect_from'
    | 'workspaceId'
    | 'language'
    | 'calendar_step'
    | 'calendar_rtl'
    | 'calendar_timeslots'
    | 'start_on_monday'

type StorageKeys = {
    [item: string]: StorageKey,
}

const STORAGE_KEYS: StorageKeys = {
    CALENDAR_DEFAULT_VIEW: 'calendarDefaultView',
    REDIRECT_FROM: 'redirect_from',
    WORKSPACE_ID: 'workspaceId',
    LANGUAGE: 'language',
    CALENDAR_STEP: 'calendar_step',
    CALENDAR_RTL: 'calendar_rtl',
    CALENDAR_TIMESLOTS: 'calendar_timeslots',
    START_ON_MONDAY: 'start_on_monday',
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