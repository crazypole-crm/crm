import { TabPaneProps, Tabs } from "antd"
import { useMemo } from "react"
import { AuthForm } from "./AuthForm";
import {SettingOutlined, LockOutlined} from '@ant-design/icons';
import { loginFormDataActions, loginFormDataAtom } from "../viewModel/loginFormData";
import { useAtomWithSelector } from "../../core/reatom/useAtomWithSelector";
import { useAction } from "@reatom/react";
import { registrationFormDataActions, registrationFormDataAtom } from "../viewModel/registrationFormData";

interface Tab extends Omit<TabPaneProps, 'tab'> {
    key: string;
    label: React.ReactNode;
}

function LoginTab() {
    const userName = useAtomWithSelector(loginFormDataAtom, x => x.userName)
    const userNameError = useAtomWithSelector(loginFormDataAtom, x => x.userNameError)
    const password = useAtomWithSelector(loginFormDataAtom, x => x.password)
    const passwordError = useAtomWithSelector(loginFormDataAtom, x => x.passwordError)
    const remeberMe = useAtomWithSelector(loginFormDataAtom, x => x.rememberMe)
    const isDisabledSubmitButton = useAtomWithSelector(loginFormDataAtom, x => x.isDisabledSubmitButton)

    const handleSetUserName = useAction(loginFormDataActions.setUserName)
    const handleSetPassword = useAction(loginFormDataActions.setPassword)
    const handleSetRememberMe = useAction(loginFormDataActions.setRememberMe)
    const handleSubmit = useAction(loginFormDataActions.submit)

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
                },
            ]}
            rememberMeData={{
                checked: remeberMe,
                onChange: handleSetRememberMe,
            }}
            submitButtonData={{
                text: 'Войти',
                onClick: handleSubmit,
                disabled: isDisabledSubmitButton,
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
    const isDisabledSubmitButton = useAtomWithSelector(registrationFormDataAtom, x => x.isDisabledSubmitButton)

    const handleSetEmail = useAction(registrationFormDataActions.setEmail)
    const handleSetPassword = useAction(registrationFormDataActions.setPassword)
    const handleSetConfirmPassword = useAction(registrationFormDataActions.setConfirmPassword)
    const handleSetRememberMe = useAction(registrationFormDataActions.setRememberMe)
    const handleSubmit = useAction(registrationFormDataActions.submit)

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
                },
                {
                    id: 'password',
                    value: password,
                    placeholder: 'Пароль',
                    type: 'password',
                    onPressEnter: handleSubmit,
                    onChange: handleSetPassword,
                    error: passwordError || '',
                },
                {
                    id: 'confirm password',
                    value: confirmPassword,
                    placeholder: 'Подтвердите пароль',
                    type: 'password',
                    onPressEnter: handleSubmit,
                    onChange: handleSetConfirmPassword,
                    error: confirmPasswordError || '',
                },
            ]}
            rememberMeData={{
                checked: rememberMe,
                onChange: handleSetRememberMe,
            }}
            submitButtonData={{
                text: 'Зарегистрироваться',
                onClick: handleSubmit,
                disabled: isDisabledSubmitButton,
            }}
        />
    )
}


function AuthTabs() {
    const tabs: Array<Tab> = useMemo(() => ([
        {
            label: 'Войти',
            key: 'login',
            children: <LoginTab />,
        },
        {
            label: 'Зарегистрироваться',
            key: 'registration',
            children: <RegistrationTab />
        }
    ]), [])

    return <Tabs
        items={tabs}
    />

}

export {
    AuthTabs,
}