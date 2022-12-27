import React, {useMemo} from "react";
import moment from "moment/moment";
import {Moment} from "moment";
import {Time} from "../../../../viewModel/calendar/time";
import styles from "./TrainingTimePeriod.module.css";
import {TimePicker} from "antd";


type DisabledTime = {
    disabledHours: number[];
    disabledMinutes: number[];
};

type TrainingTimePeriodProps = {
    trainingStartTime: Time,
    trainingEndTime: Time,
    setTrainingStartTime: (value: Time) => void,
    setTrainingEndTime: (value: Time) => void,
    periodError?: boolean,
}

function TrainingTimePeriod({
    trainingEndTime,
    setTrainingEndTime,
    trainingStartTime,
    setTrainingStartTime,
    periodError = false,
}: TrainingTimePeriodProps) {

    const momentTimeStart = useMemo(() => moment({
        hour: trainingStartTime.hour,
        minute: trainingStartTime.minutes,
    }), [trainingStartTime])

    const momentTimeEnd = useMemo(() => moment({
        hour: trainingEndTime.hour,
        minute: trainingEndTime.minutes,
    }), [trainingEndTime])

    const onChange = (value: Moment | null, setter: (value: Time) => void) => {
        if (value) {
            const date = value.toDate()
            setter({
                hour: date.getHours(),
                minutes: date.getMinutes(),
            })
        }
    }

    const disabledStartTime: DisabledTime = useMemo(() => {
        const disabledHours: number[] = []
        const disabledMinutes: number[] = []

        const endTimeHours = trainingEndTime.hour
        for (let i = endTimeHours + 1; i < 24; i++) {
            disabledHours.push(i)
        }
        if (endTimeHours === trainingStartTime.hour) {
            const endTimeMinutes = trainingEndTime.minutes
            for (let i = endTimeMinutes; i < 60; i++) {
                disabledMinutes.push(i)
            }
        }

        return {
            disabledHours,
            disabledMinutes,
        }
    }, [trainingEndTime, trainingStartTime])

    const disabledEndTime: DisabledTime = useMemo(() => {
        const disabledHours: number[] = []
        const disabledMinutes: number[] = []

        const startTimeHours = trainingStartTime.hour
        for (let i = startTimeHours - 1; i >= 0; i--) {
            disabledHours.push(i)
        }

        if (startTimeHours === trainingEndTime.hour) {
            const startTimeMinutes = trainingStartTime.minutes
            for (let i = startTimeMinutes; i >= 0; i--) {
                disabledMinutes.push(i)
            }
        }

        return {
            disabledHours,
            disabledMinutes,
        }
    }, [trainingStartTime, trainingEndTime])

    return (
        <div className={styles.timePeriod}>
            <TimePicker
                status={periodError ? 'error' : ''}
                value={momentTimeStart}
                format={'HH:mm'}
                onSelect={value => onChange(value, setTrainingStartTime)}
                disabledTime={() => ({
                    disabledHours: () => disabledStartTime.disabledHours,
                    disabledMinutes: () => disabledStartTime.disabledMinutes,
                })}
                showNow={false}
                allowClear={false}
            />
            -
            <TimePicker
                status={periodError ? 'error' : ''}
                value={momentTimeEnd}
                format={'HH:mm'}
                onSelect={value => onChange(value, setTrainingEndTime)}
                disabledTime={() => ({
                    disabledHours: () => disabledEndTime.disabledHours,
                    disabledMinutes: () => disabledEndTime.disabledMinutes,
                })}
                showNow={false}
                allowClear={false}
            />
            {
                periodError && <div className={styles.errorMessage}>
                    {'Неправильный период времени'}
                </div>
            }
        </div>
    )
}

export {
    TrainingTimePeriod,
}