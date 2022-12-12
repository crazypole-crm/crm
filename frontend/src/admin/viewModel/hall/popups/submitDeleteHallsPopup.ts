import { combine, declareAction, declareAtom } from "@reatom/core"
import { declareAtomWithSetter } from "../../../../core/reatom/declareAtomWithSetter"
import { deleteHalls } from "../deleteHalls"

const open = declareAction<string[]>('submitDeleteHall.open')
const close = declareAction('submitDeleteHall.close')

const [openedAtom, setOpened] = declareAtomWithSetter('submitDeleteHalls.opened', false, on => [
    on(open, () => true),
    on(close, () => false),
    on(deleteHalls.done, () => false),
])

const deletingHallsIds = declareAtom<string[]>('submitDeleteHalls.deletingHallsIds', [], on => [
    on(open, (_, value) => value)
])

const submit = declareAction('submitDeleteHalls.submit',
    (_, store) => {
        const hallsIds = store.getState(deletingHallsIds)
        store.dispatch(deleteHalls(hallsIds))
    }
)

const submitDeleteHallsPopupAtom = combine({
    opened: openedAtom,
    hallsIds: deletingHallsIds,
})

const submitDeleteHallsPopupActions = {
    setOpened,
    open,
    close,
    submit,
}

export {
    submitDeleteHallsPopupAtom,
    submitDeleteHallsPopupActions,
}