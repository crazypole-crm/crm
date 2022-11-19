import { combine, declareAction, declareAtom } from "@reatom/core"
import { declareAtomWithSetter } from "../../../../core/reatom/declareAtomWithSetter"
import { deleteDirections } from "../deleteDirections"

const open = declareAction<string[]>('deleteDirection.open')
const close = declareAction('deleteDirection.close')

const [openedAtom, setOpened] = declareAtomWithSetter('deleteDirection.opened', false, on => [
    on(open, () => true),
    on(close, () => false),
    on(deleteDirections.done, () => false),
])

const deletingDirectionsIds = declareAtom<string[]>('deleteDirection.deletingDirectionsIds', [], on => [
    on(open, (_, value) => value)
])

const submit = declareAction('deleteDirection.submit',
    (_, store) => {
        const directionsIds = store.getState(deletingDirectionsIds)
        store.dispatch(deleteDirections(directionsIds))
    }
)

const deleteDirectionPopupAtom = combine({
    opened: openedAtom,
    directionsIds: deletingDirectionsIds,
})

const deleteDirectionPopupActions = {
    setOpened,
    open,
    close,
    submit,
}

export {
    deleteDirectionPopupAtom,
    deleteDirectionPopupActions,
}