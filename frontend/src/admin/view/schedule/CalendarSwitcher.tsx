import { Radio, RadioChangeEvent } from "antd";
import styles from "./CalendarSwitcher.module.css";
import {useCallback, useMemo} from "react";
import {CalendarType} from "./Calendar";

type CalendarSwitcherProps = {
    calendarType: CalendarType,
    onCalendarTypeChanged: (type: CalendarType) => void,
}

function CalendarSwitcher({
    calendarType,
    onCalendarTypeChanged,
}: CalendarSwitcherProps) {
    const options = useMemo(() => ([
        { label: 'Неделя', value: 'week' },
        { label: 'День', value: 'day' },
    ]), [])

    const onChange = useCallback((e: RadioChangeEvent) => {
        switch (e.target.value) {
            case 'week':
                onCalendarTypeChanged('week')
                break
            case 'day':
                onCalendarTypeChanged('day')
                break
        }
    }, [onCalendarTypeChanged])

    return (
        <div className={styles.switcherContainer}>
            <Radio.Group options={options} onChange={onChange} value={calendarType} optionType="button" />
        </div>
    )
}

export {
    CalendarSwitcher,
}