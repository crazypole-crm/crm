import {combine, declareAction, declareAtom} from "@reatom/core";
import {Time} from "../time";
import {LocalStorage, STORAGE_KEYS} from "../../../../core/localStorage/localStorage";

function getDefaultDayStartTime(): Time {
    const timeFromLocalStorage = LocalStorage.getValue<Time>(STORAGE_KEYS.CALENDAR_DAY_START_TIME)
    if (timeFromLocalStorage) {
        return timeFromLocalStorage
    }
    return {
        minutes: 0,
        hour: 8,
    }
}

function getDefaultDayEndTime(): Time {
    const timeFromLocalStorage = LocalStorage.getValue<Time>(STORAGE_KEYS.CALENDAR_DAY_END_TIME)
    if (timeFromLocalStorage) {
        return timeFromLocalStorage
    }
    return {
        minutes: 0,
        hour: 22,
    }
}

function getDefaultStepTime(): Time {
    const timeFromLocalStorage = LocalStorage.getValue<Time>(STORAGE_KEYS.CALENDAR_STEP_TIME)
    if (timeFromLocalStorage) {
        return timeFromLocalStorage
    }
    return {
        minutes: 0,
        hour: 1,
    }
}

const setDayStartTime = declareAction<Time>('calendarSettings.setDayStartTime',
    (value, store) => {
        LocalStorage.setValue<Time>(STORAGE_KEYS.CALENDAR_DAY_START_TIME, value)
    },
)

const dayStartTimeAtom = declareAtom<Time>('calendarSettings.dayStartTime', getDefaultDayStartTime(), on => [
    on(setDayStartTime, (_, value) => value)
])

const setDayEndTime = declareAction<Time>('calendarSettings.setDayEndTime',
    (value, store) => {
        LocalStorage.setValue<Time>(STORAGE_KEYS.CALENDAR_DAY_END_TIME, value)
    },
)

const dayEndTimeAtom = declareAtom<Time>('calendarSettings.dayEndTime', getDefaultDayEndTime(), on => [
    on(setDayEndTime, (_, value) => value)
])

const setStepTime = declareAction<Time>('calendarSettings.setStepTime',
    (value, store) => {
        LocalStorage.setValue<Time>(STORAGE_KEYS.CALENDAR_STEP_TIME, value)
    },
)

const stepTimeAtom = declareAtom<Time>('calendarSettings.stepTime', getDefaultStepTime(), on => [
    on(setStepTime, (_, value) => value)
])

const calendarSettingsAtom = combine(({
    dayStartTime: dayStartTimeAtom,
    dayEndTime: dayEndTimeAtom,
    stepTime: stepTimeAtom,
}))

const calendarSettingsAction = {
    setDayStartTime,
    setDayEndTime,
    setStepTime,
}

type DisabledTime = {
    disabledHours:  number[],
    disabledMinutes: number[],
};

export {
    calendarSettingsAction,
    calendarSettingsAtom,
}

export type {
    DisabledTime,
}