

function getMonthTitle(monthNumber: number): string {
    const moths = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    return moths[monthNumber]
}

function getBirthDayString(birthDay: Date): string {
    return `${birthDay.getDate()} ${getMonthTitle(birthDay.getMonth())} ${birthDay.getFullYear()}`
}

export {
    getBirthDayString,
}