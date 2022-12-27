import {Button, Radio, RadioChangeEvent} from "antd";
import styles from "./CalendarSwitcher.module.css";
import {useCallback, useMemo} from "react";
import {CalendarType} from "./Calendar";
import {SettingOutlined} from "@ant-design/icons";
import {useAction, useAtom} from "@reatom/react";
import {calendarSettingsPopupActions} from "../../viewModel/calendar/calendartSettings/calendarSettingsPopup";
import {calendarSettingsAtom} from "../../viewModel/calendar/calendartSettings/calendarSettings";
import {getValueByCheckedKey} from "../../../core/getValueByCheckedKey";

type CalendarSwitcherProps = {
    calendarType: CalendarType,
    onCalendarTypeChanged: (type: CalendarType) => void,
}

function CalendarSwitcher({
    calendarType,
    onCalendarTypeChanged,
}: CalendarSwitcherProps) {
    const handleOpenCalendarSettingsPopup = useAction(calendarSettingsPopupActions.open)
    const calendarSettings = useAtom(calendarSettingsAtom)
    const options = useMemo(() => ([
        { label: 'Рабочая неделя', value: 'work-week' },
        { label: 'Неделя', value: 'week' },
        { label: 'День', value: 'day' },
    ]), [])

    const onChange = useCallback((e: RadioChangeEvent) => {
        const action = getValueByCheckedKey(e.target.value, {
            'work-week': () => onCalendarTypeChanged('work-week'),
            'week': () => onCalendarTypeChanged('week'),
            'day': () => onCalendarTypeChanged('day'),
        })
        action()
    }, [onCalendarTypeChanged])

    return (
        <div className={styles.switcherContainer}>
            <Button
                type={'link'}
                shape={'circle'}
                icon={<SettingOutlined />}
                onClick={() => handleOpenCalendarSettingsPopup({
                    dayEndTime: calendarSettings.dayEndTime,
                    dayStartTime: calendarSettings.dayStartTime,
                    stepTime: calendarSettings.stepTime
                })}
            />
            <Radio.Group options={options} onChange={onChange} value={calendarType} optionType="button" />
        </div>
    )
}

export {
    CalendarSwitcher,
}