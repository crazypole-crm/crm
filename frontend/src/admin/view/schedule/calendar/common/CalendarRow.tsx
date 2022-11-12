import styles from './CalendarRow.module.css'
import {StyledComponent} from "../../../../../core/styles/StyledComponent";
import { joinClassNames } from '../../../../../core/styles/joinClassNames';

type CalendarRowProps = StyledComponent<{
    children: JSX.Element,
}>

function CalendarRow({
    children,
    className,
}: CalendarRowProps) {

    return (
        <div className={joinClassNames(styles.row, className)}>
            {children}
        </div>
    )
}

export {
    CalendarRow,
}