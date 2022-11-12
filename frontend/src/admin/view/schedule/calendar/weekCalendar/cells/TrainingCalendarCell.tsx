import {CalendarCell} from "../../common/CalendarCell";
import styles from "./TrainingCell.module.css";
import {TrainingData} from "../../../../../viewModel/calendar/TrainingData";
import {useAction, useAtom} from "@reatom/react";
import {directionsAtom} from "../../../../../viewModel/direction/directions";
import {Time} from "../../../../../viewModel/calendar/time";
import {normalizeDate} from "../../../../users/table/userTableDataConvert";
import {usersAtom} from "../../../../../viewModel/users/users";
import {hallsAtom} from "../../../../../viewModel/hall/halls";
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

type TrainingCalendarCellProps = {
    trainingData: TrainingData,
    time: Time,
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

function getFreePlaces(hallCapacity: number, usersCount: number) {
    const freePlaces = Math.max(hallCapacity - usersCount, 0)
    if (freePlaces > 0) {
        return `Свободно ${freePlaces} места`
    }
    return 'Все места заняты'
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
                title={'Добавить событие'}
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
}: TrainingCalendarCellProps) {
    const currentUser = useAtom(authorizedCurrentUser)
    const directions = useAtom(directionsAtom)
    const halls = useAtom(hallsAtom)
    const users = useAtom(usersAtom)
    const ref = useRef()
    const [popoverOpened, setPopoverOpened] = useState(false)

    const handleOpenEditTrainingPopup = useAction(editTrainingPopupActions.open)
    const handleOpenReplaceTrainerPopup = useAction(replaceTrainerPopupActions.open)
    const handleMoveTrainingPopup = useAction(moveTrainingPopupActions.open)

    const trainer = users[trainingData.trainerId]
    const hall = halls[trainingData.hallId]
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
        handleMoveTrainingPopup({
            id: trainingData.id,
            date: trainingData.date,
            endTime: trainingData.timeEnd,
            startTime: trainingData.timeEnd
        })
    }

    const popoverItems: Required<MenuProps>['items'][number][] = [
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
        {
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
    ]

    const onPopoverItemClick: MenuProps['onClick'] = (e) => {
        const action = getValueByCheckedKey(e.key, {
            'replaceTrainer': onReplaceTrainer,
            'cancelTraining': () => console.log('cancel Training'),
            'moveTraining': onMoveTraining,
            'enrollTraining': () => console.log('enroll training'),
            'checkUserList': () => console.log('check users for training'),
            'addTraining': onAdd,
            'editTraining': onEdit,
            'deleteTraining': () => console.log('delete Training'),
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
                console.log('record to training')
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
                        ? getFreePlaces(hall.capacity, trainingData.clients.length)
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
                    currentUser.role === 'admin'
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