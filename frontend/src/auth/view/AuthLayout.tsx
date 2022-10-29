import styles from './AuthLayout.module.css'
import { AuthTabs } from './AuthTabs'



function AuthLayout() {
    return (
        <div className={styles.layout}>
            <div className={styles.container}>
                <div className={styles.logoContainer}>
                </div>
                <AuthTabs/>
            </div>
        </div>
    )
}

export {
    AuthLayout,
}