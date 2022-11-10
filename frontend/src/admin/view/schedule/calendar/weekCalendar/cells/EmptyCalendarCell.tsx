import styles from "./EmptyCalendarCell.module.css";
import {CalendarCell} from "../../common/CalendarCell";
import {AddPlusIcon} from "../../../../../../icons/AddPlusIcon";
import {Time} from "../../../../../viewModel/calendar/time";

type EmptyCalendarCellProps = {
    time: Time,
}

function EmptyCalendarCell({
    time,
}: EmptyCalendarCellProps) {
    const onAdd = () => {
        console.log('add training')
    }

    return (
        <CalendarCell className={styles.cell}>
            <div className={styles.plus} onClick={onAdd}>
                <AddPlusIcon className={styles.plusIcon}/>
            </div>
        </CalendarCell>
    )
}

export {
    EmptyCalendarCell,
}