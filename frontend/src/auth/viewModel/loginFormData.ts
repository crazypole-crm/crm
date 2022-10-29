import { combine, declareAction, map } from "@reatom/core";
import { declareAtomWithSetter } from "../../core/reatom/declareAtomWithSetter";
import { validateRequiredField } from "./FieldErrorTypes";


const [userNameAtom, setUserName] = declareAtomWithSetter('auth.login.userName', '')

const [userNameErrorAtom, setUserNameError] = declareAtomWithSetter<string | null>('auth.login.userNameError', null, on => [
    on(setUserName, () => null)
])

const [passwordAtom, setPassword] = declareAtomWithSetter('auth.login.password', '')

const [passwordErrorAtom, setPasswordError] = declareAtomWithSetter<string | null>('auth.login.passwordError', null, on => [
    on(setPassword, () => null)
])

const [rememberMeAtom, setRememberMe] = declareAtomWithSetter('auth.login.rememberMe', false)

const isDisabledSubmitButtonAtom = map(combine({
    userNameError: userNameErrorAtom,
    passwordError: passwordErrorAtom,
}), ({passwordError, userNameError}) => !!passwordError || !!userNameError)

const submit = declareAction('auth.login.submit',
    (_, store) => {
        const userName = store.getState(userNameAtom)
        const password = store.getState(passwordAtom)
        const userNameError = store.getState(userNameErrorAtom)
        const passwordError = store.getState(passwordErrorAtom)
        const remeberMe = store.getState(rememberMeAtom)
        
        const newUserNameError = userNameError || validateRequiredField(userName)
        const newPasswordError = passwordError || validateRequiredField(password)

        store.dispatch(setUserNameError(newUserNameError))
        store.dispatch(setPasswordError(newPasswordError))

        if (newPasswordError || newUserNameError) {
            return
        }

        console.log('login with data', {
            userName,
            password,
            remeberMe,
        })
    }
)

const loginFormDataAtom = combine({
    userName: userNameAtom,
    password: passwordAtom,
    userNameError: userNameErrorAtom,
    passwordError: passwordErrorAtom,
    rememberMe: rememberMeAtom,
    isDisabledSubmitButton: isDisabledSubmitButtonAtom,
})

const loginFormDataActions = {
    setUserName,
    setUserNameError,
    setPassword,
    setPasswordError,
    setRememberMe,
    submit,
}

export {
    loginFormDataActions,
    loginFormDataAtom,
}