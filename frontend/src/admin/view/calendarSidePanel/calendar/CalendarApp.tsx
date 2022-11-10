import {Calendar} from 'antd';
import type {Moment} from 'moment';
import React, {FC} from 'react';
import styles from './CalendarApp.module.css'
import moment from "moment";

type CalendarAppProps = {
    selectedDate: Date,
    onDateChange: (date: Date) => void
}

function dateToMoment(date: Date): Moment {
    return moment({
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate()
    })
}

const CalendarApp: FC<CalendarAppProps> = ({selectedDate, onDateChange}) => {

    const selectedMomentDate = dateToMoment(selectedDate);

    function onPanelChange(value: Moment) {
        onDateChange(value.toDate())
    }

    function onChange(value: Moment) {
        onDateChange(value.toDate())
    }

    return (
        <div className={styles.siteCalendarCard}>
            <Calendar value={selectedMomentDate} fullscreen={false} onPanelChange={onPanelChange} onChange={onChange}/>
        </div>
    );
};

export default CalendarApp;