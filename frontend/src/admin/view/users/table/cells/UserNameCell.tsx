import {TableUserNameType} from "../CollumnsData"
import {joinName} from "../userTableDataConvert"
import styles from './UserNameCell.module.css'

type UserNameCellProps = {
    name: TableUserNameType,
}

function UserNameCell({
    name,
}: UserNameCellProps) {
    return (
        <span
            onClick={() => {}}
            className={styles.title}
        >
            {joinName(name)}
        </span>
    )
}

export {
    UserNameCell,
}