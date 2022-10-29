function validateRequiredField(userName: string): string | null {
    return !!userName ? null : 'Обязательное поле'
}

export {
    validateRequiredField,
}