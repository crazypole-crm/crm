import { combine, declareAction, declareAtom } from "@reatom/core"
import { declareAtomWithSetter } from "../../../../core/reatom/declareAtomWithSetter"
import { deleteDirections } from "../deleteDirections"

const open = declareAction<string[]>('submitDeleteDirection.open')
const close = declareAction('submitDeleteDirection.close')

const [openedAtom, setOpened] = declareAtomWithSetter('submitDeleteDirections.opened', false, on => [
    on(open, () => true),
    on(close, () => false),
    on(deleteDirections.done, () => false),
])

const deletingDirectionsIds = declareAtom<string[]>('submitDeleteDirections.deletingDirectionsIds', [], on => [
    on(open, (_, value) => value)
])

const submit = declareAction('submitDeleteDirections.submit',
    (_, store) => {
        const directionsIds = store.getState(deletingDirectionsIds)
        store.dispatch(deleteDirections(directionsIds))
    }
)

const submitDeleteDirectionsPopupAtom = combine({
    opened: openedAtom,
    directionsIds: deletingDirectionsIds,
})

const submitDeleteDirectionsPopupActions = {
    setOpened,
    open,
    close,
    submit,
}

export {
    submitDeleteDirectionsPopupAtom,
    submitDeleteDirectionsPopupActions,
}