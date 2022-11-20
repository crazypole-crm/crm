import { Header } from "antd/lib/layout/layout"
import styles from './AdminHeader.module.css'
import React from "react";
import ProfileBar from "./profileBar/ProfileBar";

function AdminHeader() {
    
    return (
        <Header className={styles.header}><ProfileBar/></Header>
    )
}

export {
    AdminHeader,
}