import { useAction, useAtom } from "@reatom/react"
import { authorizedCurrentUser } from "../../../currentUser/currentUser"
import { hallsAtom } from "../../viewModel/hall/halls"
import { editHallPopupActions } from "../../viewModel/hall/popups/editHallPopup"
import styles from './HallsLayout.module.css'

type HallNameCellProps = {
    id: string,
    name: string,
}

function HallsTableNameCell({
    id,
    name,
}: HallNameCellProps) {
    const currentUser = useAtom(authorizedCurrentUser)
    const halls = useAtom(hallsAtom)
    const handleOpenEditHallPopup = useAction(editHallPopupActions.open)

    const onClick = () => {
        handleOpenEditHallPopup({
            hallData: halls[id],
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
    HallsTableNameCell,
}
