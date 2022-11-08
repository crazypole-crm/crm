import { CollumnIdType, UsersTable } from "./table/UsersTable"
import styles from './UsersLayout.module.css'
import {useEffect, useState} from "react";
import { UsersTableCommandPanel } from "./table/UsersTableCommandPanel";
import { getVisibleCollumnsFromLocalStorage, setVisibleCollumnsToLocalStorage, VisibleCollumsData } from "./table/CollumnsData";
import {usersAtom} from "../../viewModel/users/users";
import {useAction, useAtom} from "@reatom/react";
import {loadAllUsersData, usersLoadingAtom} from "../../viewModel/users/loadUsers";

function UsersLayout() {
    const [visibleCollumns, setVisibleCollumns] = useState<VisibleCollumsData>(getVisibleCollumnsFromLocalStorage())
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const users = useAtom(usersAtom)
    const usersLoading = useAtom(usersLoadingAtom)

    const handleLoadAllUsers = useAction(loadAllUsersData)

    useEffect(() => {
        handleLoadAllUsers()
    }, [handleLoadAllUsers])

    const changeCollumnVisiblility = (id: CollumnIdType, checked: boolean) => {
        const newVisibleCollumns = {
            ...visibleCollumns,
        }
        newVisibleCollumns[id] = checked
        setVisibleCollumns(newVisibleCollumns)
        setVisibleCollumnsToLocalStorage(newVisibleCollumns)
    }

    return (
        <div className={styles.layout}>
            <UsersTableCommandPanel
                selectedRowKeys={selectedRowKeys}
                visibleCollumns={visibleCollumns}
                setVisibleCollumns={changeCollumnVisiblility}
            />
            <UsersTable
                usersData={usersLoading ? null : Object.values(users)}
                selectedRowKeys={selectedRowKeys}
                setSelectedRowKeys={setSelectedRowKeys}
                visibleCollumns={visibleCollumns}
            />
        </div>
    )
}

export {
    UsersLayout,
}