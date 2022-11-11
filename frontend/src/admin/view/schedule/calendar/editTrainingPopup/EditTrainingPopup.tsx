import {useAction, useAtom} from "@reatom/react";
import {
    editTrainingPopupActions,
    editTrainingPopupAtom
} from "../../../../viewModel/calendar/editTrainingPopup/editTrainingPopup";
import {useAtomWithSelector} from "../../../../../core/reatom/useAtomWithSelector";
import styles from './EditTrainingPopup.module.css'
import {directionsAtom} from "../../../../viewModel/direction/directions";
import {hallsAtom} from "../../../../viewModel/hall/halls";
import {trainersAtom} from "../../../../viewModel/users/users";
import React, {useMemo} from "react";
import moment from "moment";
import {Avatar, Checkbox, DatePicker, DatePickerProps, Modal, Select, TimePicker} from "antd";
import {Moment} from "moment/moment";
import {Time} from "../../../../viewModel/calendar/time";
import TextArea from "antd/lib/input/TextArea";
import { UserOutlined } from "@ant-design/icons";
import ruRU from "antd/lib/calendar/locale/ru_RU";


type FieldBlockProps = {
    title: string,
    content: JSX.Element,
    error?: boolean
}

type DisabledTime = {
    disabledHours: number[];
    disabledMinutes: number[];
};

function FieldBlock({
    title,
    content,
    error = false,
}: FieldBlockProps) {
    return (
        <div className={styles.blockContainer}>
            <span className={styles.blockTitle}>{title}</span>
            <div className={styles.blockContent}>{content}</div>
            {error && <div className={styles.errorMessage}>
                {'Поле обязательное'}
            </div>}
        </div>
    )
}

function TrainingDatePicker() {
    const trainingDate = useAtomWithSelector(editTrainingPopupAtom, x => x.trainingDate)
    const handleSetTrainingDate = useAction(editTrainingPopupActions.setTrainingDate)

    const momentDate = useMemo(() => moment({
        year: trainingDate.year,
        month: trainingDate.month,
        date: trainingDate.date
    }), [trainingDate])

    const onChange: DatePickerProps['onChange'] = (value) => {
        if (value) {
            const date = value.toDate()
            handleSetTrainingDate({
                date: date.getDate(),
                month: date.getMonth(),
                year: date.getFullYear(),
            })
        }
    }

    return <DatePicker value={momentDate} onChange={onChange} locale={ruRU} />
}

function TrainingTimePeriod() {
    const trainingStartTime = useAtomWithSelector(editTrainingPopupAtom, x => x.trainingStartTime)
    const trainingEndTime = useAtomWithSelector(editTrainingPopupAtom, x => x.trainingEndTime)
    const handleSetTrainingStartTime = useAction(editTrainingPopupActions.setTrainingStartTime)
    const handleSetTrainingEndTime = useAction(editTrainingPopupActions.setTrainingEndTime)

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
                value={momentTimeStart}
                format={'HH:mm'}
                onSelect={value => onChange(value, handleSetTrainingStartTime)}
                disabledHours={() => disabledStartTime.disabledHours}
                disabledMinutes={() => disabledStartTime.disabledMinutes}
            />
            -
            <TimePicker
                value={momentTimeEnd}
                format={'HH:mm'}
                onSelect={value => onChange(value, handleSetTrainingEndTime)}
                disabledHours={() => disabledEndTime.disabledHours}
                disabledMinutes={() => disabledEndTime.disabledMinutes}
            />
        </div>
    )
}

function TrainingDescription() {
    const trainingDescription = useAtomWithSelector(editTrainingPopupAtom, x => x.trainingDescription)
    const handleSetTrainingDescription = useAction(editTrainingPopupActions.setTrainingDescription)

    return <TextArea
        value={trainingDescription}
        placeholder="Описание"
        onChange={e => handleSetTrainingDescription(e.target.value)}
        autoSize={{ minRows: 3, maxRows: 5 }}
    />
}

function TrainingDirection() {
    const trainingDirection = useAtomWithSelector(editTrainingPopupAtom, x => x.trainingDirection)
    const trainingDirectionError = useAtomWithSelector(editTrainingPopupAtom, x => x.trainingDirectionError)
    const directions = useAtom(directionsAtom)
    const handleTrainingDirection = useAction(editTrainingPopupActions.setTrainingDirection)

    const direction = useMemo(() => trainingDirection && directions[trainingDirection], [directions, trainingDirection])

    const options = useMemo(() => Object.values(directions).map(directionData => ({
        value: directionData.id,
        label: directionData.name
    })), [directions])


    return <Select
        status={trainingDirectionError ? 'error' : ''}
        placeholder={'Направление'}
        showSearch
        value={direction && direction.id}
        onChange={id => handleTrainingDirection(id)}
        options={options}
        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
        style={{
            width: 200,
        }}
    />
}

function TrainingHall() {
    const trainingHall = useAtomWithSelector(editTrainingPopupAtom, x => x.trainingHall)
    const trainingHallError = useAtomWithSelector(editTrainingPopupAtom, x => x.trainingHallError)
    const halls = useAtom(hallsAtom)
    const handleSetTrainingHall = useAction(editTrainingPopupActions.setTrainingHall)

    const hall = useMemo(() => trainingHall && halls[trainingHall], [halls, trainingHall])

    const options = useMemo(() => Object.values(halls).map(hallData => ({
        value: hallData.id,
        label: hallData.name
    })), [halls])

    return <Select
        status={trainingHallError ? 'error' : ''}
        placeholder={'Зал'}
        showSearch
        value={hall && hall.id}
        onChange={id => handleSetTrainingHall(id)}
        options={options}
        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
        style={{
            width: 200,
        }}
    />
}

function TrainingTrainer() {
    const trainingTrainer = useAtomWithSelector(editTrainingPopupAtom, x => x.trainingTrainer)
    const trainingTrainerError = useAtomWithSelector(editTrainingPopupAtom, x => x.trainingTrainerError)
    const trainers = useAtom(trainersAtom)
    const handleTrainingTrainer = useAction(editTrainingPopupActions.setTrainingTrainer)

    const trainer = useMemo(() => trainingTrainer && trainers.find(trainerData => trainerData.id === trainingTrainer), [trainers, trainingTrainer])

    const options = useMemo(() => Object.values(trainers).map(trainerData => ({
        value: trainerData.id,
        label: [trainerData.lastName, trainerData.firstName, trainerData.middleName].filter(Boolean).join(' ')
    })), [trainers])

    return (
        <div className={styles.trainerRow}>
            {trainer && <Avatar size={50} icon={<UserOutlined />} src={trainer.avatarUrl || null} />}
            <Select
                status={trainingTrainerError ? 'error' : ''}
                placeholder={'Тренер'}
                showSearch
                value={trainer && trainer.id}
                onChange={id => handleTrainingTrainer(id)}
                options={options}
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                style={{
                    width: 200,
                }}
            />
        </div>
    )
}

function RepeatableBlock() {
    const repeatable = useAtomWithSelector(editTrainingPopupAtom, x => x.repeatable)
    const handleSetRepeatable = useAction(editTrainingPopupActions.setRepeatable)

    return (
        <div className={styles.repeatableBlock}>
            <span className={styles.blockTitle}>{'Повторить на всё расписание:'}</span>
            <Checkbox
                className={styles.checkbox}
                value={repeatable}
                onChange={e => handleSetRepeatable(e.target.checked)}
            />
        </div>
    )
}

function Content() {
    const trainingTrainerError = useAtomWithSelector(editTrainingPopupAtom, x => x.trainingTrainerError)
    const trainingDirectionError = useAtomWithSelector(editTrainingPopupAtom, x => x.trainingDirectionError)
    const trainingHallError = useAtomWithSelector(editTrainingPopupAtom, x => x.trainingHallError)

    return (
        <div className={styles.content}>
            <FieldBlock
                title={'Дата:'}
                content={<TrainingDatePicker/>}
            />
            <FieldBlock
                title={'Время:'}
                content={<TrainingTimePeriod />}
            />
            <FieldBlock
                title={'Направление:'}
                content={<TrainingDirection/>}
                error={trainingDirectionError}
            />
            <FieldBlock
                title={'Зал:'}
                content={<TrainingHall/>}
                error={trainingHallError}
            />
            <FieldBlock
                title={'Преподаватель:'}
                content={<TrainingTrainer />}
                error={trainingTrainerError}
            />
            <FieldBlock
                title={'О занятии:'}
                content={<TrainingDescription/>}
            />
            <RepeatableBlock />
        </div>
    )
}

function EditTrainingPopup() {
    const mode = useAtomWithSelector(editTrainingPopupAtom, x => x.mode)
    const editTrainingPopupOpened = useAtomWithSelector(editTrainingPopupAtom, x => x.opened)
    const handleCloseEditTrainingPopup = useAction(editTrainingPopupActions.close)
    const handleSubmitTraining = useAction(editTrainingPopupActions.submit)

    return <Modal
        title={mode === 'edit'
                ? 'Редактирование занятия'
                : 'Добавление занятия'}
        open={editTrainingPopupOpened}
        centered
        okText={mode === 'edit'
                ? 'Изменить занятие'
                : 'Добавить занятие'}
        cancelText={'Отмена'}
        onOk={handleSubmitTraining}
        onCancel={handleCloseEditTrainingPopup}
    >
        <Content/>
    </Modal>
}

export {
    EditTrainingPopup,
}