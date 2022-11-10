import styles from './CalendarCell.module.css'
import {StyledComponent} from "../../../../../core/styles/StyledComponent";
import {joinClassNames} from '../../../../../core/styles/joinClassNames';

type CalendarCellProps = StyledComponent<{
    children: JSX.Element,
}>

function CalendarCell({
    children,
    className
}: CalendarCellProps) {

    return (
        <div className={joinClassNames(styles.cell, className)}>
            {children}
        </div>
    )
}

export {
    CalendarCell,
}