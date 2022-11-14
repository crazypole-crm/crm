import {UserRole} from "../../../../viewModel/users/UserData";
import styles from './UserRoleCell.module.css'
import {Tag} from "antd";
import {getValueByCheckedKey} from "../../../../../core/getValueByCheckedKey";

type UserRoleCellProps = {
    role: UserRole
}

function mapRoleTypeToColor(role: UserRole): string {
    return getValueByCheckedKey(role, {
        'admin': 'green',
        'trainer': 'geekblue',
        'client': 'orange',
    })
}

function mapRoleTypeToText(role: UserRole): string {
    return getValueByCheckedKey(role, {
        'admin': 'Администратор',
        'trainer': 'Тренер',
        'client': 'Клиент',
    })
}

function UserRoleCell({
    role,
}: UserRoleCellProps) {

    return (
        <div className={styles.roleContainer}>
            <Tag color={mapRoleTypeToColor(role)}>{mapRoleTypeToText(role)}</Tag>
        </div>
    )
}

export {
    mapRoleTypeToText,
    UserRoleCell,
}