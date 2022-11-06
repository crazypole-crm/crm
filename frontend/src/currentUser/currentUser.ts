import {declareAction, map} from '@reatom/core'
import { declareAtomWithSetter } from '../core/reatom/declareAtomWithSetter';
import {AuthenticatedUserModel, UserModel} from './UserModel';

const userMockData: UserModel = {
    isAuthUser: false,
};

const setEmail = declareAction<string>()
const setFirstname = declareAction<string>()
const setLastname = declareAction<string>()
const setMiddlename = declareAction<string>()
const setUserPhone = declareAction<string>()
const setAvatarUrl = declareAction<string>()
const setBirthDay = declareAction<Date>()
const setLastVisit = declareAction<Date>()
const setUserUnauthorized = declareAction()

const [currentUserAtom, setCurrentUserData] = declareAtomWithSetter<UserModel>('currentUserAtom', userMockData, (on) => [
    on(setEmail, (state, email) => ({...state, email})),
    on(setFirstname, (state, firstname) => ({...state, firstname})),
    on(setLastname, (state, lastname) => ({...state, lastname})),
    on(setMiddlename, (state, middleName) => ({...state, middleName})),
    on(setUserPhone, (state, phone) => ({...state, phone})),
    on(setAvatarUrl, (state, avatarUrl) => ({...state, avatarUrl})),
    on(setBirthDay, (state, birthDay) => ({...state, birthDay})),
    on(setUserUnauthorized, () => ({isAuthUser: false})),
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
    setMiddlename,
    setBirthDay,
    setLastVisit,
    setUserUnauthorized,
}

export {
    currentUserActions,
    currentUserAtom,
    authorizedCurrentUser,
};