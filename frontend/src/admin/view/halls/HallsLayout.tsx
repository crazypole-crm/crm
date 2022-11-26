import { useAction, useAtom } from '@reatom/react'
import { useEffect } from 'react'
import { hallsAtom } from '../../viewModel/hall/halls'
import { hallsLoadingAtom, loadHalls } from '../../viewModel/hall/loadHalls'
import { HallsTableCommandPanel } from './HallsCommandPanel'
import styles from './HallsLayout.module.css'
import { HallsTable } from './HallsTable'


function HallsLayout() {
    const halls = useAtom(hallsAtom)
    const hallsLoading = useAtom(hallsLoadingAtom)
    
    const handleLoadHalls = useAction(loadHalls)

    useEffect(() => {
        handleLoadHalls()
    }, [handleLoadHalls])

    return (
        <div className={styles.layout}>
            <HallsTableCommandPanel/>
            <HallsTable
                hallsData={hallsLoading ? null : Object.values(halls)}
            />
        </div>
    )
}

export {
    HallsLayout,
}