import { Router } from "../../../../core/router/router"
import { joinName, TableUserNameType } from "../CollumnsData"
import styles from './UserNameCell.module.css'

type UserNameCellProps = {
    name: TableUserNameType,
}

function UserNameCell({
    name,
}: UserNameCellProps) {
    return (
        <span
            onClick={() => Router.User.open(name.id)}
            className={styles.title}
        >
            {joinName(name)}
        </span>
    )
}

export {
    UserNameCell,
}