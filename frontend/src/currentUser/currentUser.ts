import {declareAction, map} from '@reatom/core'
import { declareAtomWithSetter } from '../core/reatom/declareAtomWithSetter';
import {AuthenticatedUserModel, UserModel} from './UserModel';
import {UserRole} from "../admin/viewModel/users/UserData";

const userMockData: UserModel = {
    isAuthUser: false,
};

const setEmail = declareAction<string>()
const setFirstname = declareAction<string>()
const setLastname = declareAction<string>()
const setMiddleName = declareAction<string>()
const setUserPhone = declareAction<string>()
const setAvatarUrl = declareAction<string>()
const setBirthDay = declareAction<Date>()
const setLastVisit = declareAction<Date>()
const setUserUnauthorized = declareAction()
const setUserRole = declareAction<UserRole>()

const [currentUserAtom, setCurrentUserData] = declareAtomWithSetter<UserModel>('currentUserAtom', userMockData, (on) => [
    on(setEmail, (state, email) => ({...state, email})),
    on(setFirstname, (state, firstname) => ({...state, firstname})),
    on(setLastname, (state, lastname) => ({...state, lastname})),
    on(setMiddleName, (state, middleName) => ({...state, middleName})),
    on(setUserPhone, (state, phone) => ({...state, phone})),
    on(setAvatarUrl, (state, avatarUrl) => ({...state, avatarUrl})),
    on(setBirthDay, (state, birthDay) => ({...state, birthDay})),
    on(setUserUnauthorized, () => ({isAuthUser: false})),
    on(setUserRole, (state, role) => ({...state, role}))
])

const authorizedCurrentUser = map(currentUserAtom, (user) => (
    user as AuthenticatedUserModel
))

const currentUserActions = {
    setCurrentUserData,
    setEmail,
    setFirstname,
    setLastname,
    setUserPhone,
    setAvatarUrl,
    setMiddleName,
    setBirthDay,
    setLastVisit,
    setUserUnauthorized,
    setUserRole,
}

export {
    currentUserActions,
    currentUserAtom,
    authorizedCurrentUser,
};