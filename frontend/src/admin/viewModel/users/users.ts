import { declareMapAtom } from "../../../core/reatom/declareMapAtom"
import { UserData } from "./UserData"
import {map} from "@reatom/core";


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

const trainersAtom = map(usersAtom, users => Object.values(users).filter(user => user.role === 'trainer'))
const clientsAtom = map(usersAtom, users => Object.values(users).filter(user => user.role === 'client'))

const usersActions = {
    removeUsers,
    updateUser,
    updateUsers,
    setNewUsers,
}

export {
    usersAtom,
    trainersAtom,
    clientsAtom,
    usersActions,
}