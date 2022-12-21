import { declareAtomWithSetter } from "../../../core/reatom/declareAtomWithSetter"
import { deleteUser } from "./deleteUser"

const [selectedUsersRowKeysAtom, setSelectedUsersRowKeys] = declareAtomWithSetter<React.Key[]>('usersSelectedRows', [], on => [
    on(deleteUser.done, () => [])
])

export {
    selectedUsersRowKeysAtom,
    setSelectedUsersRowKeys
}