import {useAtomWithSelector} from "../../../../../core/reatom/useAtomWithSelector";
import {useAction, useAtom} from "@reatom/react";
import {Modal, TimePicker} from "antd";
import React, {useMemo} from "react";
import {
    calendarSettingsPopupActions,
    calendarSettingsPopupAtom
} from "../../../../viewModel/calendar/calendartSettings/calendarSettingsPopup";
import moment, {Moment} from "moment/moment";
import {FieldBlock} from "../common/FieldBlock";
import styles from './CalendarSettingsPopup.module.css'
import {Time} from "../../../../viewModel/calendar/time";
import {setErrorTimeInStepBlock, errorTimeInStepBlockAtom } from "../../../../viewModel/calendar/calendartSettings/calendarSettings";

function TimeStepBlock() {
    const timeStep = useAtomWithSelector(calendarSettingsPopupAtom, x => x.stepTime)
    const setTimeStepCallback = useAction(calendarSettingsPopupActions.setStepTime)
    const isZeroTime = (date: Date) => {
        return date.getHours() === 0 && date.getMinutes() === 0
    }
    const handleSetTimeStep = (value: Date) => {
            const date = value;

            if (isZeroTime(date)) {
                return
            }

            setTimeStepCallback({
                hour: date.getHours(),
                minutes: date.getMinutes(),
            })
    }

    const momentTimeStep = useMemo(() => moment({
        hour: timeStep.hour,
        minute: timeStep.minutes,
    }), [timeStep])

    const onChange = (value: Moment | null) => {
        if (value) {
            const date = value.toDate()
            handleSetTimeStep(date)
        }
    }

    return <TimePicker
        minuteStep={15}
        value={momentTimeStep}
        onSelect={onChange}
        format={'HH:mm'}
        showNow={false}
    />
}

function PeriodTimeBlock() {
    const dayStartTime = useAtomWithSelector(calendarSettingsPopupAtom, x => x.dayStartTime)
    const dayEndTime = useAtomWithSelector(calendarSettingsPopupAtom, x => x.dayEndTime)
    const timeError = useAtom(errorTimeInStepBlockAtom);
    const handleSetDayStartTime = useAction(calendarSettingsPopupActions.setDayStartTime)
    const handleSetDayEndTime = useAction(calendarSettingsPopupActions.setDayEndTime)   
    const setTimeError = useAction(setErrorTimeInStepBlock);

    const momentStartTime = useMemo(() => moment({
        hour: dayStartTime.hour,
        minute: dayStartTime.minutes,
    }), [dayStartTime])

    const momentEndTime = useMemo(() => moment({
        hour: dayEndTime.hour,
        minute: dayEndTime.minutes,
    }), [dayEndTime])

    const onChange = (value: Moment | null, setter: (value: Time) => void, isEndTime: boolean) => {
        if (value) {
            setTimeError(false)
            const date = value.toDate()
            checkTimeError(value, isEndTime)          
            setter({
                hour: date.getHours(),
                minutes: date.getMinutes(),
            })  
        }
    }
    const checkTimeError = (value: Moment | null, isEndTime: boolean) => {
        if (value) {
            const date = value.toDate()
            if(!isEndTime && (date.getHours() > dayEndTime.hour || (date.getHours() === dayEndTime.hour && date.getMinutes() >= dayEndTime.minutes))){
                setTimeError(true);
            } else if(isEndTime && (date.getHours() < dayStartTime.hour || (date.getHours() === dayStartTime.hour && date.getMinutes() <= dayStartTime.minutes))){
                setTimeError(true);
            } else {
                setTimeError(false);
            }
        }
        
    }

    return (
        <div className={styles.timePeriod}>
            <TimePicker
                status={timeError?'error':''}
                minuteStep={15}
                value={momentStartTime}
                format={'HH:mm'}
                onSelect={value => {onChange(value, handleSetDayStartTime, false)}}
                showNow={false}
                allowClear={false}
            />
            -
            <TimePicker
                status={timeError?'error':''}
                minuteStep={15}
                value={momentEndTime}
                format={'HH:mm'}
                onSelect={value => {onChange(value, handleSetDayEndTime, true)}}
                showNow={false}
                allowClear={false}
            />
            <div className={styles.errorMessage}>
                {timeError?'Неверный промежуток':''}
            </div>
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
    const timeError = useAtom(errorTimeInStepBlockAtom);

    return <Modal
        title={'Настройки календаря'}
        open={calendarSettingsPopupOpened}
        centered
        okText={'Сохранить'}
        cancelText={'Отмена'}
        onOk={handleSubmit}
        onCancel={handleCloseSettingsPopup}
        okButtonProps={{ disabled: timeError}}
    >
        <Content/>
    </Modal>
}

export {
    CalendarSettingsPopup,
}