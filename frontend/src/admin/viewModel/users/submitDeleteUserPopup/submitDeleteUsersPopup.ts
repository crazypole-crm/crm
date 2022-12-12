import { combine, declareAction, declareAtom } from "@reatom/core"
import { declareAtomWithSetter } from "../../../../core/reatom/declareAtomWithSetter"
import { deleteUser } from "../deleteUser"


const open = declareAction<string[]>('submitDeleteUser.open')
const close = declareAction('submitDeleteUser.close')

const [openedAtom, setOpened] = declareAtomWithSetter('submitDeleteUsers.opened', false, on => [
    on(open, () => true),
    on(close, () => false),
    on(deleteUser.done, () => false),
])

const deletingUsersIds = declareAtom<string[]>('submitDeleteUsers.deletingUsersIds', [], on => [
    on(open, (_, value) => value)
])

const submitDeleteUsersPopupAtom = combine({
    opened: openedAtom,
    usersIds: deletingUsersIds,
})

const submitDeleteUsersPopupActions = {
    setOpened,
    open,
    close,
}

export {
    submitDeleteUsersPopupAtom,
    submitDeleteUsersPopupActions,
}