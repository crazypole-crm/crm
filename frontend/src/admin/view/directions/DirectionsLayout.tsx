import styles from './DirectionsLayout.module.css'
import {useEffect, useState} from "react";
import {useAction, useAtom} from "@reatom/react";
import {directionsLoadingAtom, loadDirections} from "../../viewModel/direction/loadDirections";
import {directionsAtom} from "../../viewModel/direction/directions";
import {DirectionsTable} from './DirectionsTable';
import {DirectionsTableCommandPanel} from './DirectionsCommandPanel';

function DirectionsLayout() {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const directions = useAtom(directionsAtom)
    const directionsLoading = useAtom(directionsLoadingAtom)

    const handleLoadDirections = useAction(loadDirections)

    useEffect(() => {
        handleLoadDirections()
    }, [handleLoadDirections])

    return (
        <div className={styles.layout}>
            <DirectionsTableCommandPanel
                selectedRowKeys={selectedRowKeys}
            />
            <DirectionsTable
                directionsData={directionsLoading ? null : Object.values(directions)}
                selectedRowKeys={selectedRowKeys}
                setSelectedRowKeys={setSelectedRowKeys}
            />
        </div>
    )
}

export {
    DirectionsLayout,
}