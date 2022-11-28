import {useAtomWithSelector} from "../../../../../core/reatom/useAtomWithSelector";
import {useAction} from "@reatom/react";
import { Modal, TimePicker} from "antd";
import {useMemo, useState} from "react";
import {
    calendarSettingsPopupActions,
    calendarSettingsPopupAtom
} from "../../../../viewModel/calendar/calendartSettings/calendarSettingsPopup";
import moment, {Moment} from "moment/moment";
import {FieldBlock} from "../common/FieldBlock";
import styles from './CalendarSettingsPopup.module.css'
import {Time} from "../../../../viewModel/calendar/time";
import { dateCompare } from "../../../users/table/userTableDataSort";
import { DisabledTime } from "../../../../viewModel/calendar/calendartSettings/calendarSettings";

function TimeStepBlock() {
    const timeStep = useAtomWithSelector(calendarSettingsPopupAtom, x => x.stepTime)
    const handleSetTimeStep = useAction(calendarSettingsPopupActions.setStepTime) 

    const momentTimeStep = useMemo(() => moment({
        hour: timeStep.hour,
        minute: timeStep.minutes,
    }), [timeStep])

    const onChange = (value: Moment | null) => {
        if (value) {
            const date = value.toDate()
            handleSetTimeStep({
                hour: date.getHours(),
                minutes: date.getMinutes(),
            })
        }
    }

    return <TimePicker
        minuteStep={15}
        value={momentTimeStep}
        onSelect={onChange}
        format={'HH:mm'}
    />
}

function PeriodTimeBlock() {
    const dayStartTime = useAtomWithSelector(calendarSettingsPopupAtom, x => x.dayStartTime)
    const handleSetDayStartTime = useAction(calendarSettingsPopupActions.setDayStartTime)
    const handleSetDayEndTime = useAction(calendarSettingsPopupActions.setDayEndTime)
    const minuteStep = 15;

    const getDisbledTime = (hour: number, minute: number, minuteStep: number):DisabledTime =>{
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
    }

    const momentStartTime = useMemo(() => moment({
        hour: dayStartTime.hour,
        minute: dayStartTime.minutes,
    }), [dayStartTime])

    const momentEndTime = useMemo(() => moment({
        hour: dayStartTime.hour + 1,
        minute: dayStartTime.minutes,
    }), [dayStartTime])

    const [disabledTime, setDisabletTime] = useState<DisabledTime>(getDisbledTime(dayStartTime.hour, dayStartTime.minutes, minuteStep))
    const [disabledMinutes, setDisabletMinutes] = useState<number[]>(getDisbledTime(dayStartTime.hour, dayStartTime.minutes, minuteStep).disabledMinutes)
    

    const onChange = (value: Moment | null, setter: (value: Time) => void) => {
        if (value) {
            const date = value.toDate()
            setter({
                hour: date.getHours(),
                minutes: date.getMinutes(),
            })
        }
    }

    const onChangeForDisadledTime = (value: Moment | null) => {
        if (value) {
            const date = value.toDate()
            setDisabletTime(getDisbledTime(date.getHours(), date.getMinutes(), minuteStep));
            setDisabletMinutes(disabledTime.disabledMinutes);
        }
    }

    const onChangeForDisadledMinutes = (value: Moment | null, thisHour: number) => {
        if (value) {
            const date = value.toDate()
            if(date.getHours() === disabledTime.disabledHours[disabledTime.disabledHours.length - 1] + 1){
                setDisabletMinutes(disabledTime.disabledMinutes)
            } else {
                setDisabletMinutes([]);
            }
        }
    }

    return (
        <div className={styles.timePeriod}>
            <TimePicker
                minuteStep={minuteStep}
                value={momentStartTime}
                format={'HH:mm'}
                onSelect={value => {onChange(value, handleSetDayStartTime); onChangeForDisadledTime(value)}}
            />
            -
            <TimePicker
                autoFocus = {false}
                disabledHours={()=>disabledTime.disabledHours}
                disabledMinutes={()=>disabledMinutes}
                minuteStep={minuteStep}
                value={momentEndTime}
                format={'HH:mm'}
                onSelect={value => {onChange(value, handleSetDayEndTime); onChangeForDisadledMinutes(value, value.toDate().getHours())}}
            />
        </div>
    )
}

function Content() {
    return (
        <div className={styles.content}>
            <FieldBlock
                title={'Временной шаг'}
                content={<TimeStepBlock/>}
            />
            <FieldBlock
                title={'Временная сетка'}
                content={<PeriodTimeBlock/>}
            />
        </div>
    )
}

function CalendarSettingsPopup() {
    const calendarSettingsPopupOpened = useAtomWithSelector(calendarSettingsPopupAtom, x => x.opened)
    const handleCloseSettingsPopup = useAction(calendarSettingsPopupActions.close)
    const handleSubmit = useAction(calendarSettingsPopupActions.submit)

    return <Modal
        title={'Настройки календаря'}
        open={calendarSettingsPopupOpened}
        centered
        okText={'Сохранить'}
        cancelText={'Отмена'}
        onOk={handleSubmit}
        onCancel={handleCloseSettingsPopup}
    >
        <Content/>
    </Modal>
}

export {
    CalendarSettingsPopup,
}