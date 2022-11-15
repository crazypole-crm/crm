import {TrainingData, TrainingDate} from "../../../../viewModel/calendar/TrainingData";
import styles from './TrainingInfo.module.css'
import {useAtom} from "@reatom/react";
import {trainersAtom} from "../../../../viewModel/users/users";
import {directionsAtom} from "../../../../viewModel/direction/directions";
import {hallsAtom} from "../../../../viewModel/hall/halls";
import {getValueByCheckedKey} from "../../../../../core/getValueByCheckedKey";
import {Time} from "../../../../viewModel/calendar/time";
import {normalizeDate} from "../../../users/table/userTableDataConvert";
import {UserData} from "../../../../viewModel/users/UserData";
import {Avatar} from "antd";
import {getFullName} from "../../../../../common/name";
import {verify} from "../../../../../core/verify";
import {UserOutlined} from "@ant-design/icons";
import React from "react";

type TrainingInfo = {
    trainingData: TrainingData,
}

function getMonthTitle(monthNumber: number): string {
    const moths = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
    return moths[monthNumber]
}

function getWeekDayTitle(weekDayNumber: number) {
    return getValueByCheckedKey(weekDayNumber, {
        0: 'Понедельник',
        1: 'Вторник',
        2: 'Среда',
        3: 'Четверг',
        4: 'Пятница',
        5: 'Суббота',
        6: 'Воскресенье',
    })
}

function normalizeDayNumber(day: number): number {
    if (day === 0) {
        return 6
    }
    return day - 1
}

function getDateString(date: TrainingDate): string {
    const modelDate = new Date()
    modelDate.setDate(date.date)
    modelDate.setMonth(date.month)
    modelDate.setFullYear(date.year)
    return `${getWeekDayTitle(normalizeDayNumber(modelDate.getDay()))}, ${date.date} ${getMonthTitle(date.month)}`
}

function getTimePeriodString(startTime: Time, endTime: Time) {
    return `${normalizeDate(startTime.hour)}:${normalizeDate(startTime.minutes)} - ${normalizeDate(endTime.hour)}:${normalizeDate(endTime.minutes)}`
}

function getFreePlaces(hallCapacity: number, usersCount: number) {
    const freePlaces = Math.max(hallCapacity - usersCount, 0)
    if (freePlaces > 0) {
        return `Свободно ${freePlaces} места`
    }
    return 'Все места заняты'
}


function TrainerInfo(trainerData: UserData) {
    return (
        <div className={styles.trainerRow}>
            <Avatar
                size={50}
                icon={<UserOutlined />}
                src={trainerData.avatarUrl || null}
            />
            <div className={styles.trainerName}>{getFullName({...trainerData}) || trainerData.email}</div>
        </div>
    )
}

function TrainingInfo({
    trainingData,
}: TrainingInfo) {
    const trainers = useAtom(trainersAtom)
    const directions = useAtom(directionsAtom)
    const halls = useAtom(hallsAtom)

    return (
        <div className={styles.container}>
            <div className={styles.direction}>{directions[trainingData.directionId].name}</div>
            <div className={styles.date}>{getDateString(trainingData.date)}</div>
            <div className={styles.timePeriod}>{getTimePeriodString(trainingData.timeStart, trainingData.timeEnd)}</div>
            <div className={styles.capacity}>{trainingData.type === 'grouped'
                ? getFreePlaces(halls[trainingData.hallId].capacity, trainingData.clients.length)
                : 'Индивидуальное занятие'}</div>
            <TrainerInfo {...verify(trainers.find(trainer => trainingData.trainerId === trainer.id))} />
            <div className={styles.description}>О занятии: {trainingData.description || 'Пока нет описания'}</div>
        </div>
    )
}

export {
    TrainingInfo,
}