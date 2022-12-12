import { combine, declareAction, declareAtom } from "@reatom/core"
import { declareAtomWithSetter } from "../../../../core/reatom/declareAtomWithSetter"
import { deleteDirections } from "../deleteDirections"

const open = declareAction<string[]>('deleteDirection.open')
const close = declareAction('deleteDirection.close')

const [openedAtom, setOpened] = declareAtomWithSetter('deleteDirections.opened', false, on => [
    on(open, () => true),
    on(close, () => false),
    on(deleteDirections.done, () => false),
])

const deletingDirectionsIds = declareAtom<string[]>('deleteDirections.deletingDirectionsIds', [], on => [
    on(open, (_, value) => value)
])

const deleteDirectionsPopupAtom = combine({
    opened: openedAtom,
    directionsIds: deletingDirectionsIds,
})

const deleteDirectionsPopupActions = {
    setOpened,
    open,
    close,
}

export {
    deleteDirectionsPopupAtom,
    deleteDirectionsPopupActions,
}