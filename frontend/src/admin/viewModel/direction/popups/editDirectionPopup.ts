import { combine, declareAction, declareAtom } from "@reatom/core"
import { declareAtomWithSetter } from "../../../../core/reatom/declareAtomWithSetter"
import { verify } from "../../../../core/verify"
import { createDirection } from "../createDirection"
import { DirectionData } from "../DirectionData"
import { updateDirection } from "../updateDirection"


type ModeType = 'create' | 'edit'

type OpenPayload = {
    mode: 'create',
} | {
    mode: 'edit',
    directionData: DirectionData,
}

const open = declareAction<OpenPayload>('editDirection.open')
const close = declareAction('editDirection.close')

const [openedAtom, setOpened] = declareAtomWithSetter('editDirection.opened', false, on => [
    on(open, () => true),
    on(close, () => false),
    on(updateDirection.done, () => false),
    on(createDirection.done, () => false),
])

const popupModeAtom = declareAtom<ModeType>('editDirection.popupMode', 'edit', on => [
    on(open, (_, value) => value.mode)
])

const directionIdAtom = declareAtom<string|null>('editDirection.directionId', null, on => [
    on(open, (_, value) => value.mode === 'edit' ? value.directionData.id : null)
])

const [directionNameAtom, setDirectionName] = declareAtomWithSetter<string|null>('editDirection.directionName', null, on => [
    on(open, (_, value) => value.mode === 'edit' ? value.directionData.name : null)
])

const [directionNameErrorAtom, setDirectionNameError] = declareAtomWithSetter('editDirection.directionNameError', false, on => [
    on(setDirectionName, () => false),
    on(open, () => false)
])

const [directionDescriptionAtom, setDirectionDescription] = declareAtomWithSetter<string|null>('editDirection.directionDescription', null, on => [
    on(open, (_, value) => value.mode === 'edit' ? value.directionData.description : null)
])

const [directionDescriptionErrorAtom, setDirectionDescriptionError] = declareAtomWithSetter('editDirection.directionDescriptionError', false, on => [
    on(setDirectionDescription, () => false),
    on(open, () => false)
])

const submitButtonLoadingAtom = declareAtom('editDirection.submitButtonLoading', false, on => [
    on(createDirection, () => true),
    on(createDirection.done, () => false),
    on(createDirection.fail, () => false),
    on(updateDirection, () => true),
    on(updateDirection.done, () => false),
    on(updateDirection.fail, () => false),
    on(close, () => false),
])

const submit = declareAction('editDirection.submit',
    (_, store) => {
        const popupMode = store.getState(popupModeAtom)
        const directionId = store.getState(directionIdAtom)
        const directionName = store.getState(directionNameAtom)
        const directionDescription = store.getState(directionDescriptionAtom)

        const directionNameError = !directionName
        const  directionDescriptionError = !directionDescription

        store.dispatch(setDirectionNameError(directionNameError))
        store.dispatch(setDirectionDescriptionError(directionDescriptionError))
        if (directionNameError || directionDescriptionError) {
            return
        }

        if (popupMode === 'edit') {
            store.dispatch(updateDirection({
                id: verify(directionId),
                name: directionName,
                description: directionDescription
            }))
        }
        else {
            store.dispatch(createDirection({
                name: directionName,
                description: directionDescription
            }))
        }
    }
)

const editDirectionPopupAtom = combine({
    opened: openedAtom,
    popupMode: popupModeAtom,
    directionId: directionIdAtom,
    directionName: directionNameAtom,
    directionNameError: directionNameErrorAtom,
    directionDescription: directionDescriptionAtom,
    directionDescriptionError: directionDescriptionErrorAtom,
    submitButtonLoading: submitButtonLoadingAtom,
})

const editDirectionPopupActions = {
    setOpened,
    open,
    close,
    setDirectionName,
    setDirectionNameError,
    setDirectionDescription,
    setDirectionDescriptionError,
    submit,
}

export {
    editDirectionPopupAtom,
    editDirectionPopupActions,
}