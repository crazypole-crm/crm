import {UserRole} from "../../../../viewModel/users/UserData";
import styles from './UserRoleCell.module.css'
import {Tag} from "antd";

type UserRoleCellProps = {
    role: UserRole
}

function mapRoleTypeToColor(role: UserRole): string {
    switch (role) {
        case 'admin':
            return 'green'
        case 'trainer':
            return 'geekblue'
        case 'client':
            return 'orange'
        default:
            throw new Error(`unknown user role ${role}`)
    }
}

function mapRoleTypeToText(role: UserRole): string {
    switch (role) {
        case 'admin':
            return 'Администратор'
        case 'trainer':
            return 'Тренер'
        case 'client':
            return 'Клиент'
        default:
            throw new Error(`unknown user role ${role}`)
    }
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