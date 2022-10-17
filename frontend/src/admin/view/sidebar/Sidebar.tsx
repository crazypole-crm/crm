import Sider from "antd/lib/layout/Sider"
import styles from './Sidebar.module.css' 

function Sidebar() {
    return (
        <Sider className={styles.sider} width={80}>
        </Sider>
    )
}

export {
    Sidebar,
}