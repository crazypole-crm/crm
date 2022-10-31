import { declareAtomWithSetter } from "../../core/reatom/declareAtomWithSetter";

type AuthPageModeType = 'login' | 'registration'

const [authPageModeAtom, setAuthPageMode] = declareAtomWithSetter<AuthPageModeType>('authPageMode', 'login')

export {
    authPageModeAtom,
    setAuthPageMode,
}

export type {
    AuthPageModeType,
}