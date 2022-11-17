import {TableUserNameType} from "../CollumnsData"
import {joinName} from "../userTableDataConvert"
import styles from './UserNameCell.module.css'
import {useAction, useAtom} from "@reatom/react";
import {editUserPopupActions} from "../../../../viewModel/editUserPopup/editUserPopup";
import {usersAtom} from "../../../../viewModel/users/users";
import {authorizedCurrentUser} from "../../../../../currentUser/currentUser";
import {viewUserPopupActions} from "../../../../viewModel/users/viewUserPopup/viewUserPopup";

type UserNameCellProps = {
    name: TableUserNameType,
}

function UserNameCell({
    name,
}: UserNameCellProps) {
    const currentUser = useAtom(authorizedCurrentUser)
    const users = useAtom(usersAtom)
    const handleOpenEditUserPopup = useAction(editUserPopupActions.open)
    const handleOpenViewUserPopup = useAction(viewUserPopupActions.open)

    const onClick = () => {
        if (currentUser.role === 'admin') {
            handleOpenEditUserPopup({
                userData: users[name.id],
                mode: 'edit',
            })
        }
        else {
            handleOpenViewUserPopup(users[name.id])
        }
    }

    const fullName = joinName(name)
    return (
        <span
            onClick={onClick}
            className={styles.title}
        >
            {fullName || '-'}
        </span>
    )
}

export {
    UserNameCell,
}