import { useAtom } from "@reatom/react"
import React from "react"
import { authorizedCurrentUser } from "../../../currentUser/currentUser"
import { directionsAtom } from "../../viewModel/direction/directions"
import { directionsLoadingAtom } from "../../viewModel/direction/loadDirections"
import styles from './DirectionsLayout.module.css'

type DirectionNameCellProps = {
    id: string,
    name: string,
}

function DirectionsTableNameCell({
    id,
    name,
}: DirectionNameCellProps) {
    const currentUser = useAtom(authorizedCurrentUser)
    //const directions = useAtom(directionsAtom)
    const directionsLoading = useAtom(directionsLoadingAtom)
    // const handleOpenEditDirectiopnPopup = useAction(editDirectionPopupActions.open)

    const onClick = () => {
        if (currentUser.role === 'admin') {
            //handleOpenEditDirectiopnPopup(directions[id])
            console.log(`edit dir`, id)
        }
    }

    return (
        <span
            onClick={(currentUser.role === 'admin') ? onClick : () => {}}
            className={(currentUser.role === 'admin') ? styles.name : ''}
        >
            {name}
        </span>
    )
}

export {
    DirectionsTableNameCell,
}