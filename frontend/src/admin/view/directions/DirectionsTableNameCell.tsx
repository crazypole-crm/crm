import { useAction, useAtom } from "@reatom/react"
import { authorizedCurrentUser } from "../../../currentUser/currentUser"
import { directionsAtom } from "../../viewModel/direction/directions"
import styles from './DirectionsLayout.module.css'
import { editDirectionPopupActions } from "../../viewModel/direction/popups/editDirectionPopup"

type DirectionNameCellProps = {
    id: string,
    name: string,
}

function DirectionsTableNameCell({
    id,
    name,
}: DirectionNameCellProps) {
    const currentUser = useAtom(authorizedCurrentUser)
    const directions = useAtom(directionsAtom)
    const handleOpenEditDirectionPopup = useAction(editDirectionPopupActions.open)

    const onClick = () => {
        handleOpenEditDirectionPopup({
            directionData: directions[id],
            mode: 'edit',
        })
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