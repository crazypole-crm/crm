import { Atom, combine, declareAction, declareAtom, map } from "@reatom/core";
import { ButtonState } from "../../common/button/ButtonState";
import { declareAtomWithSetter } from "../../core/reatom/declareAtomWithSetter";
import { registrationAction } from "../../currentUser/actions/registration";
import { setAuthPageMode } from "./authPageMode";
import { validateRequiredField } from "./FieldErrorTypes";
import {useAction} from "@reatom/react";
import {loginFormDataActions} from "./loginFormData";

const [emailAtom, setEmail] = declareAtomWithSetter('auth.registation.email', '', on => [
    on(setAuthPageMode, () => '')
])

const [emailErrorAtom, setEmailError] = declareAtomWithSetter<string | null>('auth.registration.emailError', null, on => [
    on(setEmail, () => null),
    on(setAuthPageMode, () => null),
])

const [passwordAtom, setPassword] = declareAtomWithSetter('auth.registation.password', '', on => [
    on(setAuthPageMode, () => '')
])

const [passwordErrorAtom, setPasswordError] = declareAtomWithSetter<string | null>('auth.registration.passwordError', null, on => [
    on(setPassword, () => null),
    on(setAuthPageMode, () => null),
])

const [confirmPasswordAtom, setConfirmPassword] = declareAtomWithSetter('auth.registation.confirmPassword', '', on => [
    on(setAuthPageMode, () => '')
])

const [confirmPasswordErrorAtom, setConfirmPasswordError] = declareAtomWithSetter<string | null>('auth.registration.confirmPasswordError', null, on => [
    on(setConfirmPassword, () => null),
    on(setAuthPageMode, () => null),
])

const [rememberMeAtom, setRememberMe] = declareAtomWithSetter('auth.registation.rememberMe', false, on => [
    on(setAuthPageMode, () => false)
]);

const isSubmitButtonLoadingAtom = declareAtom('auth.registration.isSubmitButtonLoading', false, on => [
    on(registrationAction, () => true),
    on(registrationAction.done, () => false),
    on(registrationAction.fail, () => false),
])

const isDisabledSubmitButtonAtom = map(combine({
    emailError: emailErrorAtom,
    passwordError: passwordErrorAtom,
    confirmPasswordError: confirmPasswordErrorAtom,
}), ({emailError, passwordError, confirmPasswordError}) => !!passwordError || !!emailError || !!confirmPasswordError)

const submitButtonStateAtom: Atom<ButtonState> = map(combine({
    isDisabledSubmitButton: isDisabledSubmitButtonAtom,
    isSubmitButtonLoading: isSubmitButtonLoadingAtom,
}), ({isDisabledSubmitButton, isSubmitButtonLoading}) => {
    return isDisabledSubmitButton
        ? 'disabled'
        : isSubmitButtonLoading
            ? 'loading'
            : 'normal'
})

function validateConfirmPassword(currentPassword: string, confirmPassword: string): string | null {
    return currentPassword !== confirmPassword ? 'Пароли должны совпадать' : null
}

const submit = declareAction('auth.registation.submit',
    (_, store) => {
        const email = store.getState(emailAtom)
        const password = store.getState(passwordAtom)
        const confirmPassword = store.getState(confirmPasswordAtom)
        const emailError = store.getState(emailErrorAtom)
        const passwordError = store.getState(passwordErrorAtom)
        const confirmPasswordError = store.getState(confirmPasswordErrorAtom)

        const newEmailError = emailError || validateRequiredField(email)
        const newPasswordError = passwordError || validateRequiredField(password)
        const newConfirmPasswordError = confirmPasswordError || validateRequiredField(confirmPassword) || validateConfirmPassword(password, confirmPassword)

        store.dispatch(setEmailError(newEmailError))
        store.dispatch(setPasswordError(newPasswordError))
        store.dispatch(setConfirmPasswordError(newConfirmPasswordError))

        if (newPasswordError || newEmailError || newConfirmPasswordError) {
            return
        }

        store.dispatch(registrationAction({
            email,
            password,
        }))

    }
)

const registrationFormDataAtom = combine({
    email: emailAtom,
    password: passwordAtom,
    confirmPassword: confirmPasswordAtom,
    emailError: emailErrorAtom,
    passwordError: passwordErrorAtom,
    confirmPasswordError: confirmPasswordErrorAtom,
    rememberMe: rememberMeAtom,
    submitButtonState: submitButtonStateAtom,
})

const registrationFormDataActions = {
    setEmail,
    setPassword,
    setRememberMe,
    setConfirmPassword,
    submit,
}

export {
    registrationFormDataActions,
    registrationFormDataAtom,
}