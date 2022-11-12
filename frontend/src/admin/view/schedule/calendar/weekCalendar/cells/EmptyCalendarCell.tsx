import styles from "./EmptyCalendarCell.module.css";
import {CalendarCell} from "../../common/CalendarCell";
import {AddPlusIcon} from "../../../../../../icons/AddPlusIcon";
import {Time} from "../../../../../viewModel/calendar/time";
import {useAction, useAtom} from "@reatom/react";
import {authorizedCurrentUser} from "../../../../../../currentUser/currentUser";
import {Tooltip} from "antd";
import {editTrainingPopupActions} from "../../../../../viewModel/calendar/editTrainingPopup/editTrainingPopup";
import {TrainingDate} from "../../../../../viewModel/calendar/TrainingData";

type EmptyCalendarCellProps = {
    time: Time,
    date: TrainingDate,
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

function EmptyCalendarCell({
    time,
    date,
}: EmptyCalendarCellProps) {
    const currentUser = useAtom(authorizedCurrentUser)
    const handleOpenEditTrainingPopup = useAction(editTrainingPopupActions.open)

    const onAdd = () => {
        handleOpenEditTrainingPopup({
            mode: 'create',
            timeStart: time,
            date,
        })
    }

    return (
        <CalendarCell className={styles.cell}>
            <>
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
    EmptyCalendarCell,
}