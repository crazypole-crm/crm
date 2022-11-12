import {combine, declareAction, declareAtom} from "@reatom/core";
import {Time} from "../time";
import {declareAtomWithSetter} from "../../../../core/reatom/declareAtomWithSetter";
import {calendarSettingsAction} from "./calendarSettings";


const DEFAULT_TIME: Time = {hour: 0, minutes: 0}

type OpenPayload = {
    dayStartTime: Time,
    dayEndTime: Time,
    stepTime: Time,
}

const open = declareAction<OpenPayload>('calendarSettingsPopup.open')
const close = declareAction('calendarSettingsPopup.close')

const openedAtom = declareAtom('calendarSettingsPopup.opened', false, on => [
    on(open, () => true),
    on(close, () => false),
])

const [dayStartTimeAtom, setDayStartTime] = declareAtomWithSetter<Time>('calendarSettingsPopup.dayStartTime', DEFAULT_TIME, on => [
    on(open, (_, {dayStartTime}) => dayStartTime)
])

const [dayEndTimeAtom, setDayEndTime] = declareAtomWithSetter<Time>('calendarSettingsPopup.dayEndTime', DEFAULT_TIME, on => [
    on(open, (_, {dayEndTime}) => dayEndTime)
])

const [stepTimeAtom, setStepTime] = declareAtomWithSetter<Time>('calendarSettingsPopup.stepTime', DEFAULT_TIME, on => [
    on(open, (_, {stepTime}) => stepTime)
])

const submit = declareAction('calendarSettingsPopup.submit',
    (_, store) => {
        const dayStartTime = store.getState(dayStartTimeAtom)
        const dayEndTime = store.getState(dayEndTimeAtom)
        const stepTime = store.getState(stepTimeAtom)

        store.dispatch(calendarSettingsAction.setDayStartTime(dayStartTime))
        store.dispatch(calendarSettingsAction.setDayEndTime(dayEndTime))
        store.dispatch(calendarSettingsAction.setStepTime(stepTime))

        store.dispatch(close())
    }
)

const calendarSettingsPopupAtom = combine({
    dayStartTime: dayStartTimeAtom,
    dayEndTime: dayEndTimeAtom,
    stepTime: stepTimeAtom,
    opened: openedAtom,
})

const calendarSettingsPopupActions = {
    open,
    close,
    setDayStartTime,
    setDayEndTime,
    setStepTime,
    submit,
}

export {
    calendarSettingsPopupActions,
    calendarSettingsPopupAtom,
}