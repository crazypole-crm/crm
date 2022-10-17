import { Header } from "antd/lib/layout/layout"
import styles from './AdminHeader.module.css'

function AdminHeader() {
    
    return (
        <Header className={styles.header}>Header</Header>
    )
}

export {
    AdminHeader,
}