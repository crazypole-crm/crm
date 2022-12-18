import {useAtomWithSelector} from "../../../../../core/reatom/useAtomWithSelector";
import {useAction, useAtom} from "@reatom/react";
import {Modal, TimePicker} from "antd";
import React, {useMemo, useState} from "react";
import {
    calendarSettingsPopupActions,
    calendarSettingsPopupAtom
} from "../../../../viewModel/calendar/calendartSettings/calendarSettingsPopup";
import moment, {Moment} from "moment/moment";
import {FieldBlock} from "../common/FieldBlock";
import styles from './CalendarSettingsPopup.module.css'
import {Time} from "../../../../viewModel/calendar/time";
import {setDisabledTime, calendarSettingsDisabledTimeAtom } from "../../../../viewModel/calendar/calendartSettings/calendarSettings";

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
    const handleSetDayStartTime = useAction(calendarSettingsPopupActions.setDayStartTime)
    const handleSetDayEndTime = useAction(calendarSettingsPopupActions.setDayEndTime)
    const disabledTime = useAtom(calendarSettingsDisabledTimeAtom);
    const addDisabledTime = useAction(setDisabledTime);
    const [disabledMinutes, setDisabledMinutes] = useState<number[]>([])

    const momentStartTime = useMemo(() => moment({
        hour: dayStartTime.hour,
        minute: dayStartTime.minutes,
    }), [dayStartTime])

    const momentEndTime = useMemo(() => moment({
        hour: dayEndTime.hour,
        minute: dayEndTime.minutes,
    }), [dayEndTime])

    const onChange = (value: Moment | null, setter: (value: Time) => void) => {
        if (value) {
            const date = value.toDate()
            setter({
                hour: date.getHours(),
                minutes: date.getMinutes(),
            })
        }
    }
    const onChangeForDisabledTime = (value: Moment | null) => {
        if (value) {
            const date = value.toDate()
            addDisabledTime({hour: date.getHours(), minute: date.getMinutes()});
            if(date.getHours() > dayEndTime.hour){
                handleSetDayEndTime({
                    hour: date.getHours() + 1,
                    minutes: 0,
                });
            } else if(date.getHours() == dayEndTime.hour){
                if(date.getMinutes() >= dayEndTime.minutes){
                    if(date.getMinutes() + 15 > 60){
                        handleSetDayEndTime({
                            hour: date.getHours() + 1,
                            minutes: 0,
                        });
                    } else {
                        handleSetDayEndTime({
                            hour: date.getHours(),
                            minutes: date.getMinutes() + 15,
                        });
                        setDisabledMinutes(disabledTime.disabledMinutes);
                    }
                } else {
                    setDisabledMinutes(disabledTime.disabledMinutes)
                }        
            }
        }
    }

    const getDisabledMinutes = (value: Moment | null) => {
        if (value) {
            const date = value.toDate()
            if(disabledTime.disabledHours[disabledTime.disabledHours.length - 1] + 1 == date.getHours()){
                setDisabledMinutes(disabledTime.disabledMinutes);
            } else {
                setDisabledMinutes([]);
            }
        } else {
            setDisabledMinutes([]);
        }
    }

    return (
        <div className={styles.timePeriod}>
            <TimePicker
                minuteStep={15}
                value={momentStartTime}
                format={'HH:mm'}
                onSelect={value => {onChange(value, handleSetDayStartTime); onChangeForDisabledTime(value)}}
                showNow={false}
            />
            -
            <TimePicker
                minuteStep={15}
                value={momentEndTime}
                format={'HH:mm'}
                onSelect={value => {onChange(value, handleSetDayEndTime); getDisabledMinutes(value)}}
                showNow={false}
                disabledHours={()=>disabledTime.disabledHours}
                disabledMinutes={()=>disabledMinutes}
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