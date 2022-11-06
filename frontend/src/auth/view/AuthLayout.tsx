import { useAtom } from '@reatom/react'
import { Redirect } from 'react-router-dom'
import { Router } from '../../core/router/router'
import { currentUserAtom } from '../../currentUser/currentUser'
import styles from './AuthLayout.module.css'
import { AuthTabs } from './AuthTabs'



function AuthLayout() {
    const currentUser = useAtom(currentUserAtom)
    
    if (currentUser.isAuthUser) {
        return <Redirect to={Router.Admin.url()} />
    }

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