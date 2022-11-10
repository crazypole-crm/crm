import styles from "./EmptyCalendarCell.module.css";
import {CalendarCell} from "../../common/CalendarCell";
import {AddPlusIcon} from "../../../../../../icons/AddPlusIcon";
import {Time} from "../../../../../viewModel/calendar/time";
import {useAtom} from "@reatom/react";
import {authorizedCurrentUser} from "../../../../../../currentUser/currentUser";
import {Tooltip} from "antd";

type EmptyCalendarCellProps = {
    time: Time,
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
}: EmptyCalendarCellProps) {
    const currentUser = useAtom(authorizedCurrentUser)
    const onAdd = () => {
        console.log('add training')
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