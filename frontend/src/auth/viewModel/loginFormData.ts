import { Atom, combine, declareAction, map } from "@reatom/core";
import { ButtonState } from "../../common/button/ButtonState";
import { declareAtomWithSetter } from "../../core/reatom/declareAtomWithSetter";
import { setAuthPageMode } from "./authPageMode";
import { validateRequiredField } from "./FieldErrorTypes";


const [userNameAtom, setUserName] = declareAtomWithSetter('auth.login.userName', '', on => [
    on(setAuthPageMode, () => '')
])

const [userNameErrorAtom, setUserNameError] = declareAtomWithSetter<string | null>('auth.login.userNameError', null, on => [
    on(setUserName, () => null),
    on(setAuthPageMode, () => null),
])

const [passwordAtom, setPassword] = declareAtomWithSetter('auth.login.password', '', on => [
    on(setAuthPageMode, () => '')
])

const [passwordErrorAtom, setPasswordError] = declareAtomWithSetter<string | null>('auth.login.passwordError', null, on => [
    on(setPassword, () => null),
    on(setAuthPageMode, () => null),
])

const [rememberMeAtom, setRememberMe] = declareAtomWithSetter('auth.login.rememberMe', false, on => [
    on(setAuthPageMode, () => false)
])

const [isSubmitButtonLoadingAtom, setIsSubmitButtonLoading] = declareAtomWithSetter('auth.login.isSubmitButtonLoading', false)

const isDisabledSubmitButtonAtom = map(combine({
    userNameError: userNameErrorAtom,
    passwordError: passwordErrorAtom,
}), ({passwordError, userNameError}) => !!passwordError || !!userNameError)

const submitButtonStateAtom: Atom<ButtonState> = map(combine({
    isDisabledSubmitButton: isDisabledSubmitButtonAtom,
    isSubmitButtonLoading: isSubmitButtonLoadingAtom,
}), ({isDisabledSubmitButton, isSubmitButtonLoading}) => {
    console.log('isDisabledSubmitButton', isDisabledSubmitButton)
    console.log('isSubmitButtonLoading', isSubmitButtonLoading)
    return isDisabledSubmitButton
        ? 'disabled'
        : isSubmitButtonLoading
            ? 'loading'
            : 'normal'
})

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
        store.dispatch(setIsSubmitButtonLoading(true))
    }
)

const loginFormDataAtom = combine({
    userName: userNameAtom,
    password: passwordAtom,
    userNameError: userNameErrorAtom,
    passwordError: passwordErrorAtom,
    rememberMe: rememberMeAtom,
    submitButtonState: submitButtonStateAtom,
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