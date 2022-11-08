import {TableUserNameType} from "../CollumnsData"
import {joinName} from "../userTableDataConvert"
import styles from './UserNameCell.module.css'
import {useAction, useAtom} from "@reatom/react";
import {editUserPopupActions} from "../../../../viewModel/editUserPopup/editUserPopup";
import {usersAtom} from "../../../../viewModel/users/users";

type UserNameCellProps = {
    name: TableUserNameType,
}

function UserNameCell({
    name,
}: UserNameCellProps) {
    const users = useAtom(usersAtom)
    const handleOpenEditUserPopup = useAction(editUserPopupActions.open)
    const fullName = joinName(name)
    return (
        <span
            onClick={() => handleOpenEditUserPopup(users[name.id])}
            className={styles.title}
        >
            {fullName || '-'}
        </span>
    )
}

export {
    UserNameCell,
}