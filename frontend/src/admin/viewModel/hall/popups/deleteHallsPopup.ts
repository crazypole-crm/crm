import { combine, declareAction, declareAtom } from "@reatom/core"
import { declareAtomWithSetter } from "../../../../core/reatom/declareAtomWithSetter"
import { deleteHalls } from "../deleteHalls"

const open = declareAction<string[]>('deleteHall.open')
const close = declareAction('deleteHall.close')

const [openedAtom, setOpened] = declareAtomWithSetter('deleteHalls.opened', false, on => [
    on(open, () => true),
    on(close, () => false),
    on(deleteHalls.done, () => false),
])

const deletingHallsIds = declareAtom<string[]>('deleteHalls.deletingHallsIds', [], on => [
    on(open, (_, value) => value)
])

const submit = declareAction('deleteHalls.submit',
    (_, store) => {
        const hallsIds = store.getState(deletingHallsIds)
        store.dispatch(deleteHalls(hallsIds))
    }
)

const deleteHallsPopupAtom = combine({
    opened: openedAtom,
    hallsIds: deletingHallsIds,
})

const deleteHallsPopupActions = {
    setOpened,
    open,
    close,
    submit,
}

export {
    deleteHallsPopupAtom,
    deleteHallsPopupActions,
}