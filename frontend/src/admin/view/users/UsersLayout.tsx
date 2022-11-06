import { CollumnIdType, UsersTable } from "./table/UsersTable"
import styles from './UsersLayout.module.css'
import { useState } from "react";
import { UsersTableCommandPanel } from "./table/UsersTableCommandPanel";
import { getVisibleCollumnsFromLocalStorage, setVisibleCollumnsToLocalStorage, VisibleCollumsData } from "./table/CollumnsData";

function UsersLayout() {
    const [visibleCollumns, setVisibleCollumns] = useState<VisibleCollumsData>(getVisibleCollumnsFromLocalStorage())
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

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