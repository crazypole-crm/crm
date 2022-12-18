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

const getDisbledTime = (hour: number, minute: number, minuteStep: number):DisabledTime => {
    const times: DisabledTime = {disabledHours: [], disabledMinutes: []}
    if(minute + minuteStep >= 60){
        for(let i = 0; i <= hour;  i++){
            times.disabledHours.push(i)
        }
    } else {
        for(let i = 0; i < hour;  i++){
            times.disabledHours.push(i)
        }
        for(let i = 0; i <= minute;  i += minuteStep){
            times.disabledMinutes.push(i);
        }
    }
    return times
};

const setDisabledTime = declareAction<{hour: number, minute: number}>('calendarSettings.setDisabledTime');

const calendarSettingsDisabledTimeAtom = declareAtom<DisabledTime>({disabledHours: getDisbledTime(getDefaultDayStartTime().hour, 0, 15).disabledHours, disabledMinutes:[]}, on => [
    on(setDisabledTime, (state, {hour, minute}) => {
        return getDisbledTime(hour, minute, 15);
    })
]);

export {
    calendarSettingsAction,
    calendarSettingsAtom,
    calendarSettingsDisabledTimeAtom,
    setDisabledTime,
}