import { combine, declareAction, map } from "@reatom/core";
import { declareAtomWithSetter } from "../../core/reatom/declareAtomWithSetter";
import { validateRequiredField } from "./FieldErrorTypes";

const [emailAtom, setEmail] = declareAtomWithSetter('auth.registation.email', '')

const [emailErrorAtom, setEmailError] = declareAtomWithSetter<string | null>('auth.registration.emailError', null, on => [
    on(setEmail, () => null)
])

const [passwordAtom, setPassword] = declareAtomWithSetter('auth.registation.password', '')

const [passwordErrorAtom, setPasswordError] = declareAtomWithSetter<string | null>('auth.registration.passwordError', null, on => [
    on(setPassword, () => null)
])

const [confirmPasswordAtom, setConfirmPassword] = declareAtomWithSetter('auth.registation.confirmPassword', '')

const [confirmPasswordErrorAtom, setConfirmPasswordError] = declareAtomWithSetter<string | null>('auth.registration.confirmPasswordError', null, on => [
    on(setConfirmPassword, () => null)
])

const [rememberMeAtom, setRememberMe] = declareAtomWithSetter('auth.registation.rememberMe', false);

const isDisabledSubmitButtonAtom = map(combine({
    emailError: emailErrorAtom,
    passwordError: passwordErrorAtom,
    confirmPasswordError: confirmPasswordErrorAtom,
}), ({emailError, passwordError, confirmPasswordError}) => !!passwordError || !!emailError || !!confirmPasswordError)


function validateConfirmPassword(currentPassword: string, confirmPassword: string): string | null {
    return currentPassword === confirmPassword ? 'Пароли должны отличаться' : null
}

const submit = declareAction('auth.registation.submit',
    (_, store) => {
        const email = store.getState(emailAtom)
        const password = store.getState(passwordAtom)
        const confirmPassword = store.getState(confirmPasswordAtom)
        const rememberMe = store.getState(rememberMeAtom)
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

        console.log('registation with data', {
            email,
            rememberMe,
            password,
            confirmPassword,
        })
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
    isDisabledSubmitButton: isDisabledSubmitButtonAtom,
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