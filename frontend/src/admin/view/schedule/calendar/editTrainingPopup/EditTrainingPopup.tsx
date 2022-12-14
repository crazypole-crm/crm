import {useAction, useAtom} from "@reatom/react";
import {
    editTrainingPopupActions,
    editTrainingPopupAtom
} from "../../../../viewModel/calendar/editTrainingPopup/editTrainingPopup";
import {useAtomWithSelector} from "../../../../../core/reatom/useAtomWithSelector";
import styles from './EditTrainingPopup.module.css'
import {directionsAtom} from "../../../../viewModel/direction/directions";
import {hallsAtom} from "../../../../viewModel/hall/halls";
import React, {useMemo} from "react";
import {Modal, Select, InputNumber} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {FieldBlock} from "../common/FieldBlock";
import {RepeatableBlock} from "../common/RepeatableBlock";
import {TrainingTrainer} from "../common/TrainingTrainer";
import {clientsAtom} from "../../../../viewModel/users/users";
import {getFullName} from "../../../../../common/name";
import {TrainingDatePicker} from "../common/TrainingDatePicker";
import {TrainingTimePeriod} from "../common/TrainingTimePeriod";


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

function TrainingCapacity() {
    const trainingCapacity = useAtomWithSelector(editTrainingPopupAtom, x => x.trainingCapacity)
    const handleSetTrainingCapacity = useAction(editTrainingPopupActions.setTrainingCapacity)

    return <InputNumber
        min={1}
        max={1000}
        value={trainingCapacity}
        onChange={handleSetTrainingCapacity}
    />
}

function TrainingType() {
    const type = useAtomWithSelector(editTrainingPopupAtom, x => x.type)
    const individualClient = useAtomWithSelector(editTrainingPopupAtom, x => x.individualClient)
    const clients = useAtom(clientsAtom)
    const handleSetType = useAction(editTrainingPopupActions.setType)
    const handleSetIndividualClient = useAction(editTrainingPopupActions.setIndividualClient)

    const typesOptions = [
        {
            value: 'grouped',
            label: 'Групповое',
        },
        {
            value: 'individual',
            label: 'Индивидуальное',
        }
    ]

    const clientsOption = clients.map(client => ({
        value: client.id,
        label: getFullName(client) || client.email,
    }))

    return (
        <>
            <FieldBlock
                title={'Тип:'}
                content={<Select
                    value={type}
                    onChange={id => handleSetType(id)}
                    options={typesOptions}
                    style={{
                        width: 200,
                    }}
                />}
            />
            {type === 'individual' && <FieldBlock
                title={'Клиент:'}
                content={<Select
                    placeholder={'Пользователь'}
                    showSearch={true}
                    value={individualClient}
                    onChange={id => handleSetIndividualClient(id)}
                    options={clientsOption}
                    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    style={{
                        width: 200,
                    }}
                />}
            />}
        </>
    )
}

function Content() {
    const trainingDirectionError = useAtomWithSelector(editTrainingPopupAtom, x => x.trainingDirectionError)
    const trainingHallError = useAtomWithSelector(editTrainingPopupAtom, x => x.trainingHallError)
    const trainingTrainerError = useAtomWithSelector(editTrainingPopupAtom, x => x.trainingTrainerError)
    const trainingTrainer = useAtomWithSelector(editTrainingPopupAtom, x => x.trainingTrainer)
    const repeatable = useAtomWithSelector(editTrainingPopupAtom, x => x.repeatable)
    const type = useAtomWithSelector(editTrainingPopupAtom, x => x.type)
    const mode = useAtomWithSelector(editTrainingPopupAtom, x => x.mode)
    const trainingDate = useAtomWithSelector(editTrainingPopupAtom, x => x.trainingDate)
    const trainingStartTime = useAtomWithSelector(editTrainingPopupAtom, x => x.trainingStartTime)
    const trainingEndTime = useAtomWithSelector(editTrainingPopupAtom, x => x.trainingEndTime)
    const trainingCapacityError = useAtomWithSelector(editTrainingPopupAtom, x => x.trainingCapacityError)

    const handleSetTrainingDate = useAction(editTrainingPopupActions.setTrainingDate)
    const handleSetRepeatable = useAction(editTrainingPopupActions.setRepeatable)
    const handleTrainingTrainer = useAction(editTrainingPopupActions.setTrainingTrainer)
    const handleTrainingStartTime = useAction(editTrainingPopupActions.setTrainingStartTime)
    const handleTrainingEndTime = useAction(editTrainingPopupActions.setTrainingEndTime)

    return (
        <div className={styles.content}>
            <FieldBlock
                title={'Дата:'}
                content={<TrainingDatePicker
                    trainingDate={trainingDate}
                    setStrainingDate={handleSetTrainingDate}
                />}
            />
            <FieldBlock
                title={'Время:'}
                content={<TrainingTimePeriod
                    setTrainingEndTime={handleTrainingEndTime}
                    setTrainingStartTime={handleTrainingStartTime}
                    trainingEndTime={trainingEndTime}
                    trainingStartTime={trainingStartTime}
                />}
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
                content={<TrainingTrainer
                    trainerId={trainingTrainer}
                    setTrainerId={handleTrainingTrainer}
                    trainerError={trainingTrainerError}
                />}
                error={trainingTrainerError}
            />
            <TrainingType />
            <FieldBlock
                title={'Колличество мест'}
                content={<TrainingCapacity />}
                error={trainingCapacityError}
            />
            <FieldBlock
                title={'О занятии:'}
                content={<TrainingDescription/>}
            />
            {type === 'grouped' && mode === 'create' && <RepeatableBlock
                repeatable={repeatable}
                setRepeatable={handleSetRepeatable}
            />}
        </div>
    )
}

function EditTrainingPopup() {
    const mode = useAtomWithSelector(editTrainingPopupAtom, x => x.mode)
    const editTrainingPopupOpened = useAtomWithSelector(editTrainingPopupAtom, x => x.opened)
    const submitButtonLoading = useAtomWithSelector(editTrainingPopupAtom, x => x.submitButtonLoading)
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
        okButtonProps={{
            loading: submitButtonLoading,
            type: 'primary',
            onClick: handleSubmitTraining,
        }}
        onCancel={handleCloseEditTrainingPopup}
    >
        <Content/>
    </Modal>
}

export {
    EditTrainingPopup,
}