import { Button, Checkbox, Input, InputRef } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { ChangeEvent, useRef } from 'react';
import styles from './AuthForm.module.css'

type FormFieldData ={
    id: string,
    value: string,
    placeholder: string,
    prefixIcon?: JSX.Element,
    error: string,
    type: 'text' | 'password',
    onChange: (value: string) => void, 
    onPressEnter: () => void,
}

type SubmitButtonData = {
    text: string,
    disabled: boolean,
    onClick: () => void,
}

type RememberMeData = {
    checked: boolean,
    onChange: (value: boolean) => void,
}

type AuthFormProps = {
    fields: Array<FormFieldData>,
    rememberMeData: RememberMeData,
    submitButtonData: SubmitButtonData,
}

function FormField({
    error,
    id,
    onChange,
    onPressEnter,
    placeholder,
    prefixIcon,
    type,
    value,
}: FormFieldData) {
    const inputRef = useRef<InputRef>(null);

    const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    return (
        <div className={styles.field}>
            <Input
                key={id}
                placeholder={placeholder}
                type={type}
                prefix={prefixIcon}
                defaultValue={value}
                onChange={_onChange}
                onPressEnter={onPressEnter}
                ref={inputRef}
                status={!!error ? 'error' : undefined}
            />
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    )
}

function AuthForm({
    fields,
    rememberMeData,
    submitButtonData,
}: AuthFormProps) {

    const onRememberMeChanged = (e: CheckboxChangeEvent) => {
        rememberMeData.onChange(e.target.checked);
    }

    return (
        <div className={styles.formContainer}>
            <div>
                {fields.map(field => <FormField {...field} key={field.id} />)}
            </div>
            <Checkbox
                checked={rememberMeData.checked}
                onChange={onRememberMeChanged}
                className={styles.rememberMe}
            >Запомнить меня</Checkbox>
            <Button
                type='primary'
                size='large'
                disabled={submitButtonData.disabled}
                onClick={submitButtonData.onClick}
                className={styles.submitButton}
            >{submitButtonData.text}</Button>
        </div>
    )
}

export {
    AuthForm,
}