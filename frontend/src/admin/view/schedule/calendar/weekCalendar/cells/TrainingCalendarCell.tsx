import {CalendarCell} from "../../common/CalendarCell";
import styles from "./TrainingCell.module.css";
import {TrainingData} from "../../../../../viewModel/calendar/TrainingData";
import {useAction, useAtom} from "@reatom/react";
import {directionsAtom} from "../../../../../viewModel/direction/directions";
import {Time} from "../../../../../viewModel/calendar/time";
import {normalizeDate} from "../../../../users/table/userTableDataConvert";
import {usersAtom} from "../../../../../viewModel/users/users";
import {AddPlusIcon} from "../../../../../../icons/AddPlusIcon";
import {authorizedCurrentUser} from "../../../../../../currentUser/currentUser";
import {TextWithEllipsis} from "../../../../../../common/text/TextWithEllipsis";
import {Menu, MenuProps, Popover, Tooltip} from "antd";
import {MouseEventHandler, useRef, useState} from "react";
import {useHtmlElementEventHandler} from "../../../../../../core/hooks/useHtmlElementEventHandler";
import {editTrainingPopupActions} from "../../../../../viewModel/calendar/editTrainingPopup/editTrainingPopup";
import {replaceTrainerPopupActions} from "../../../../../viewModel/calendar/replaceTrainerPopup/replaceTrainer";
import {moveTrainingPopupActions} from "../../../../../viewModel/calendar/moveTrainingPopup/moveTrainingPopup";
import {getValueByCheckedKey} from "../../../../../../core/getValueByCheckedKey";
import {trainingActionPopupActions} from "../../../../../viewModel/calendar/trainingActionPopup/trainingActionPopup";
import {clientsTrainingPopupActions} from "../../../../../viewModel/calendar/trainingClientsPopup/trainingClientsPopup";
import {optionalArray} from "../../../../../../core/array/array";
import {
    recordToTrainingPopupActions
} from "../../../../../viewModel/calendar/recordToTrainingPopup/recordToTrainingPopup";

type TrainingCalendarCellProps = {
    trainingData: TrainingData,
    time: Time,
    showAdd: boolean,
}

function getDurationString(timeStart: Time, timeEnd: Time) {
    return `${normalizeDate(timeStart.hour)}:${normalizeDate(timeStart.minutes)} - ${normalizeDate(timeEnd.hour)}:${normalizeDate(timeEnd.minutes)}`
}

function getTrainerName(firstName?: string, lastName?: string) {
    if (!firstName || !lastName) {
        return ''
    }
    return `${firstName} ${lastName[0]}.`
}

function getFreePlaces(availablePlaceCount: number) {
    if (availablePlaceCount === 0) {
        return 'Все места заняты'
    }
    const lastDigit = Number(String(availablePlaceCount)[String(availablePlaceCount).length - 1])
    if (lastDigit === 0) {
        return `Свободно ${availablePlaceCount} мест`
    }
    if (lastDigit === 1) {
        return `Свободно ${availablePlaceCount} место`
    }
    if (lastDigit < 5) {
        return `Свободно ${availablePlaceCount} места`
    }
    return `Свободно ${availablePlaceCount} мест`
}

type AddPlusButtonProps = {
    onAdd: () => void
}

function AddPlusButton({
    onAdd,
}: AddPlusButtonProps) {

    return (
        <div className={styles.plus} onClick={onAdd}>
            <Tooltip
                title={'Добавить занятие'}
                placement={'bottom'}
                trigger={'hover'}
                mouseEnterDelay={0.3}
            >
                <AddPlusIcon className={styles.plusIcon}/>
            </Tooltip>
        </div>
    )
}

function TrainingCalendarCell({
    trainingData,
    time,
    showAdd,
}: TrainingCalendarCellProps) {
    const currentUser = useAtom(authorizedCurrentUser)
    const directions = useAtom(directionsAtom)
    const users = useAtom(usersAtom)
    const ref = useRef()
    const [popoverOpened, setPopoverOpened] = useState(false)

    const handleOpenEditTrainingPopup = useAction(editTrainingPopupActions.open)
    const handleOpenReplaceTrainerPopup = useAction(replaceTrainerPopupActions.open)
    const handleOpenMoveTrainingPopup = useAction(moveTrainingPopupActions.open)
    const handleOpenTrainingActionPopup = useAction(trainingActionPopupActions.open)
    const handleOpenClientsTrainingPopup = useAction(clientsTrainingPopupActions.open)
    const handleOpenRecordToTrainingPopup = useAction(recordToTrainingPopupActions.open)

    const trainer = users[trainingData.trainerId]
    const direction = directions[trainingData.directionId]

    const onAdd = () => {
        handleOpenEditTrainingPopup({
            mode: 'create',
            timeStart: time,
            date: trainingData.date,
        })
    }

    const onEdit = () => {
        handleOpenEditTrainingPopup({
            mode: 'edit',
            trainingData,
        })
    }

    const onReplaceTrainer = () => {
        handleOpenReplaceTrainerPopup({
            trainerId: trainingData.trainerId,
            id: trainingData.id,
        })
    }

    const onMoveTraining = () => {
        handleOpenMoveTrainingPopup({
            id: trainingData.id,
            date: trainingData.date,
            endTime: trainingData.timeEnd,
            startTime: trainingData.timeEnd
        })
    }

    const onCancelTraining = () => {
        handleOpenTrainingActionPopup({
            mode: 'cancel',
            ...trainingData,
        })
    }

    const onDeleteTraining = () => {
        handleOpenTrainingActionPopup({
            mode: 'delete',
            ...trainingData,
        })
    }

    const onRecordTraining = () => {
        handleOpenTrainingActionPopup({
            mode: 'record',
            ...trainingData,
        })
    }

    const onShowClients = () => {
        handleOpenClientsTrainingPopup({
            id: trainingData.id,
        })
    }

    const onRecordToTraining = () => {
        handleOpenRecordToTrainingPopup({
            trainingId: trainingData.id,
        })
    }

    const popoverItems: Required<MenuProps>['items'][number][] = optionalArray([
        {
            key: 'replaceTrainer',
            label: 'Разово поставить замену',
        },
        {
            key: 'cancelTraining',
            label: 'Разово отменить занятие',
        },
        {
            key: 'moveTraining',
            label: 'Разово перенести занятие',
        },
        {
            key: 'enrollTraining',
            label: 'Записать на занятие',
        },
        trainingData.type === 'grouped' && {
            key: 'checkUserList',
            label: 'Посмотреть занятые места',
        },
        {
            key: 'addTraining',
            label: 'Добавить занятие',
        },
        {
            key: 'editTraining',
            label: 'Редактировать занятие',
        },
        {
            key: 'deleteTraining',
            label: 'Удалить занятие',
        },
    ])

    const onPopoverItemClick: MenuProps['onClick'] = (e) => {
        const action = getValueByCheckedKey(e.key, {
            'replaceTrainer': onReplaceTrainer,
            'cancelTraining': onCancelTraining,
            'moveTraining': onMoveTraining,
            'enrollTraining': onRecordToTraining,
            'checkUserList': onShowClients,
            'addTraining': onAdd,
            'editTraining': onEdit,
            'deleteTraining': onDeleteTraining,
        })
        action()
        setPopoverOpened(false)
    }

    useHtmlElementEventHandler('wheel', window, (e) => {
        setPopoverOpened(false)
    })

    useHtmlElementEventHandler('click', window, (e) => {
        !e.defaultPrevented && setPopoverOpened(false)
    })

    const onTrainingMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
        if (e.button === 2) {
            setPopoverOpened(true)
            return
        }
    }

    const onTrainingInfoClick = (e: any) => {
        switch (currentUser.role) {
            case "admin":
            case "trainer":
                onEdit()
                break
            case "client":
                onRecordTraining()
                break
        }
    }

    const trainingInfo =
        <div className={styles.trainingInfo} onMouseDown={onTrainingMouseDown} onClick={onTrainingInfoClick} onContextMenu={e => e.preventDefault()}>
            <TextWithEllipsis
                text={direction.name}
                className={styles.directionTitle}
                rows={2}
            />
            <div className={styles.time}>
                {getDurationString(trainingData.timeStart, trainingData.timeEnd)}
            </div>
            <div className={styles.freePlaces}>
                {
                    trainingData.type === 'grouped'
                        ? getFreePlaces(trainingData.availableRegistrationsCount)
                        : 'Индивидуальное'
                }
            </div>
            <div className={styles.trainerName}>
                {getTrainerName(trainer.firstName, trainer.lastName)}
            </div>
        </div>

    return (
        <CalendarCell className={styles.cell}>
            <>
                {
                    currentUser.role === 'trainer' || currentUser.role === 'admin'
                        ? <Popover
                            ref={ref}
                            open={popoverOpened}
                            placement={'rightTop'}
                            trigger={'contextMenu'}
                            content={<Menu
                                selectedKeys={[]}
                                items={popoverItems}
                                onClick={onPopoverItemClick}
                                style={{
                                    border: 0
                                }}
                            />}
                            overlayClassName={styles.contextMenuPopover}
                        >
                            {trainingInfo}
                        </Popover>
                        : trainingInfo
                }
                {
                    currentUser.role !== 'client' && showAdd
                        ? <AddPlusButton onAdd={onAdd} />
                        : undefined
                }
            </>
        </CalendarCell>
    )
}

export {
    TrainingCalendarCell,
}