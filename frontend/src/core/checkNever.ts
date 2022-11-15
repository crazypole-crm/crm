

function checkNever(value: never, message: string = `unhandled value: ${JSON.stringify(value, null, ' ')}`) {
    console.error(message)
}

export {
    checkNever,
}