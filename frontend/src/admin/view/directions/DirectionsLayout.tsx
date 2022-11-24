import styles from './DirectionsLayout.module.css'
import {useEffect} from "react";
import {useAction, useAtom} from "@reatom/react";
import {directionsLoadingAtom, loadDirections} from "../../viewModel/direction/loadDirections";
import {directionsAtom} from "../../viewModel/direction/directions";
import {DirectionsTable} from './DirectionsTable';
import {DirectionsTableCommandPanel} from './DirectionsCommandPanel';

function DirectionsLayout() {
    const directions = useAtom(directionsAtom)
    const directionsLoading = useAtom(directionsLoadingAtom)
    
    const handleLoadDirections = useAction(loadDirections)

    useEffect(() => {
        handleLoadDirections()
    }, [handleLoadDirections])

    return (
        <div className={styles.layout}>
            <DirectionsTableCommandPanel/>
            <DirectionsTable
                directionsData={directionsLoading ? null : Object.values(directions)}
            />
        </div>
    )
}

export {
    DirectionsLayout,
}