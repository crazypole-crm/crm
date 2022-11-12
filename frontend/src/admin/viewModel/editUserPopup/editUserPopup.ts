import {declareAtomWithSetter} from "../../../core/reatom/declareAtomWithSetter";
import {combine, declareAction} from "@reatom/core";
import {UserData} from "../users/UserData";

const open = declareAction<UserData>('editUser.open')
const close = declareAction('editUser.close')

const [openedAtom, setOpened] = declareAtomWithSetter('editUser.opened', false, on => [
    on(open, () => true),
    on(close, () => false),
])

const editUserPopupAtom = combine({
    opened: openedAtom,
})

const editUserPopupActions = {
    setOpened,
    open,
    close,
}

export {
    editUserPopupAtom,
    editUserPopupActions,
}