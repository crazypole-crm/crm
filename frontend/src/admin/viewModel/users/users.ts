import { declareMapAtom } from "../../../core/reatom/declareMapAtom"
import { UserData } from "./UserData"


const {
    atom: usersAtom,
    updateItems: updateUsers,
    removeItems: removeUsers,
    updateItem: updateUser,
    setNewItems: setNewUsers,
} = declareMapAtom<UserData>(
    'usersAtom',
    user => user.id,
)

const usersActions = {
    removeUsers,
    updateUser,
    updateUsers,
    setNewUsers,
}

export {
    usersAtom,
    usersActions,
}