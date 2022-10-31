import { TabPaneProps, Tabs } from "antd"
import { useMemo } from "react"
import { AuthForm } from "./AuthForm";
import {SettingOutlined, LockOutlined} from '@ant-design/icons';
import { loginFormDataActions, loginFormDataAtom } from "../viewModel/loginFormData";
import { useAtomWithSelector } from "../../core/reatom/useAtomWithSelector";
import { useAction, useAtom } from "@reatom/react";
import { registrationFormDataActions, registrationFormDataAtom } from "../viewModel/registrationFormData";
import { authPageModeAtom, AuthPageModeType, setAuthPageMode } from "../viewModel/authPageMode";

interface Tab extends Omit<TabPaneProps, 'tab'> {
    key: string;
    label: React.ReactNode;
    disabled: boolean
}

function LoginTab() {
    const userName = useAtomWithSelector(loginFormDataAtom, x => x.userName)
    const userNameError = useAtomWithSelector(loginFormDataAtom, x => x.userNameError)
    const password = useAtomWithSelector(loginFormDataAtom, x => x.password)
    const passwordError = useAtomWithSelector(loginFormDataAtom, x => x.passwordError)
    const remeberMe = useAtomWithSelector(loginFormDataAtom, x => x.rememberMe)
    const submitButtonState = useAtomWithSelector(loginFormDataAtom, x => x.submitButtonState)

    const handleSetUserName = useAction(loginFormDataActions.setUserName)
    const handleSetPassword = useAction(loginFormDataActions.setPassword)
    const handleSetRememberMe = useAction(loginFormDataActions.setRememberMe)
    const handleSubmit = useAction(loginFormDataActions.submit)

    const submitButtonLoading = submitButtonState === 'loading'

    return (
        <AuthForm
            fields={[
                {
                    id: 'username',
                    value: userName,
                    placeholder: 'Username',
                    type: 'text',
                    prefixIcon: <SettingOutlined />,
                    onPressEnter: handleSubmit,
                    onChange: handleSetUserName,
                    error: userNameError || '',
                    disabled: submitButtonLoading
                },
                {
                    id: 'password',
                    value: password,
                    placeholder: 'Password',
                    type: 'password',
                    prefixIcon: <LockOutlined />,
                    onPressEnter: handleSubmit,
                    onChange: handleSetPassword,
                    error: passwordError || '',
                    disabled: submitButtonLoading
                },
            ]}
            rememberMeData={{
                checked: remeberMe,
                onChange: handleSetRememberMe,
                disabled: submitButtonLoading
            }}
            submitButtonData={{
                text: 'Войти',
                onClick: handleSubmit,
                state: submitButtonState,
            }}
        />
    )
}

function RegistrationTab() {
    const email = useAtomWithSelector(registrationFormDataAtom, x => x.email)
    const emailError = useAtomWithSelector(registrationFormDataAtom, x => x.emailError)
    const password = useAtomWithSelector(registrationFormDataAtom, x => x.password)
    const passwordError = useAtomWithSelector(registrationFormDataAtom, x => x.passwordError)
    const confirmPassword = useAtomWithSelector(registrationFormDataAtom, x => x.confirmPassword)
    const confirmPasswordError = useAtomWithSelector(registrationFormDataAtom, x => x.confirmPasswordError)
    const rememberMe = useAtomWithSelector(registrationFormDataAtom, x => x.rememberMe)
    const submitButtonState = useAtomWithSelector(registrationFormDataAtom, x => x.submitButtonState)

    const handleSetEmail = useAction(registrationFormDataActions.setEmail)
    const handleSetPassword = useAction(registrationFormDataActions.setPassword)
    const handleSetConfirmPassword = useAction(registrationFormDataActions.setConfirmPassword)
    const handleSetRememberMe = useAction(registrationFormDataActions.setRememberMe)
    const handleSubmit = useAction(registrationFormDataActions.submit)

    const submitButtonLoading = submitButtonState === 'loading'

    return (
        <AuthForm
            fields={[
                {
                    id: 'email',
                    value: email,
                    placeholder: 'Email',
                    type: 'text',
                    onPressEnter: handleSubmit,
                    onChange: handleSetEmail,
                    error: emailError || '',
                    disabled: submitButtonLoading
                },
                {
                    id: 'password',
                    value: password,
                    placeholder: 'Пароль',
                    type: 'password',
                    onPressEnter: handleSubmit,
                    onChange: handleSetPassword,
                    error: passwordError || '',
                    disabled: submitButtonLoading
                },
                {
                    id: 'confirm password',
                    value: confirmPassword,
                    placeholder: 'Подтвердите пароль',
                    type: 'password',
                    onPressEnter: handleSubmit,
                    onChange: handleSetConfirmPassword,
                    error: confirmPasswordError || '',
                    disabled: submitButtonLoading
                },
            ]}
            rememberMeData={{
                checked: rememberMe,
                onChange: handleSetRememberMe,
                disabled: submitButtonLoading
            }}
            submitButtonData={{
                text: 'Зарегистрироваться',
                onClick: handleSubmit,
                state: submitButtonState,
            }}
        />
    )
}


function AuthTabs() {
    const authPageMode = useAtom(authPageModeAtom)
    const handleAuthPageMode = useAction(setAuthPageMode)
    const loginSubmitButtonState = useAtomWithSelector(loginFormDataAtom, x => x.submitButtonState)
    const registrationSubmitButtonState = useAtomWithSelector(registrationFormDataAtom, x => x.submitButtonState)

    const tabDisabled = useMemo(() => {
        return loginSubmitButtonState === 'loading' || registrationSubmitButtonState === 'loading'
    }, [loginSubmitButtonState, registrationSubmitButtonState])

    const tabs: Array<Tab> = useMemo(() => ([
        {
            label: 'Войти',
            key: 'login',
            children: <LoginTab />,
            disabled: tabDisabled
        },
        {
            label: 'Зарегистрироваться',
            key: 'registration',
            children: <RegistrationTab />,
            disabled: tabDisabled
        }
    ]), [tabDisabled])

    return <Tabs
        items={tabs}
        activeKey={authPageMode}
        onChange={tabId => handleAuthPageMode(tabId as AuthPageModeType)}
    />

}

export {
    AuthTabs,
}