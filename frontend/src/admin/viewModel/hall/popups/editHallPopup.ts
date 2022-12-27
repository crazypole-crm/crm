import { combine, declareAction, declareAtom } from "@reatom/core"
import { isEqual } from "../../../../core/isEqual"
import { declareAtomWithSetter } from "../../../../core/reatom/declareAtomWithSetter"
import { verify } from "../../../../core/verify"
import { createHall } from "../createHall"
import { HallData } from "../HallData"
import { saveHall } from "../saveHall"


type ModeType = 'create' | 'edit'

type OpenPayload = {
    mode: 'create',
} | {
    mode: 'edit',
    hallData: HallData,
}

const open = declareAction<OpenPayload>('editHall.open')
const close = declareAction('editHall.close')

const [openedAtom, setOpened] = declareAtomWithSetter('editHall.opened', false, on => [
    on(open, () => true),
    on(close, () => false),
    on(saveHall.done, () => false),
    on(createHall.done, () => false),
])

const popupModeAtom = declareAtom<ModeType>('editHall.popupMode', 'edit', on => [
    on(open, (_, value) => value.mode)
])

function remapHallDataToPrevHallData(hallData: HallData) {
    return {
        name: hallData.name,
        capacity: hallData.capacity,
    }
}

const prevHallDataAtom = declareAtom<Omit<HallData, 'id'>|null>('editHall.prevHallData', null, on => [
    on(open, (_, value) => (value.mode === 'edit' ? remapHallDataToPrevHallData(value.hallData) : null) || null)
])

const hallIdAtom = declareAtom<string|null>('editHall.hallId', null, on => [
    on(open, (_, value) => value.mode === 'edit' ? value.hallData.id : null)
])

const [hallNameAtom, setHallName] = declareAtomWithSetter<string|null>('editHall.hallName', null, on => [
    on(open, (_, value) => value.mode === 'edit' ? value.hallData.name : null)
])

const [hallCapacityAtom, setHallCapacity] = declareAtomWithSetter<string|null>('editHall.hallCapacity', null, on => [
    on(open, (_, value) => value.mode === 'edit' ? value.hallData.capacity.toString() : null)
])

const [hallNameErrorAtom, setHallNameError] = declareAtomWithSetter('editHall.hallNameError', false, on => [
    on(setHallName, () => false),
    on(open, () => false)
])

const [hallCapacityErrorAtom, setHallCapacityError] = declareAtomWithSetter('editHall.hallCapacityError', false, on => [
    on(setHallCapacity, () => false),
    on(open, () => false)
])

const submitButtonLoadingAtom = declareAtom('editHall.submitButtonLoading', false, on => [
    on(createHall, () => true),
    on(createHall.done, () => false),
    on(createHall.fail, () => false),
    on(saveHall, () => true),
    on(saveHall.done, () => false),
    on(saveHall.fail, () => false),
    on(close, () => false),
])

const submit = declareAction('editHall.submit',
    (_, store) => {
        const popupMode = store.getState(popupModeAtom)
        const hallId = store.getState(hallIdAtom)
        const hallName = store.getState(hallNameAtom)
        const hallCapacity = store.getState(hallCapacityAtom)

        const hallNameError = !hallName
        const hallCapacityError = !hallCapacity || !RegExp(/^\d+$/).test(hallCapacity) || hallCapacity === '0'

        if (hallNameError || hallCapacityError) {
            store.dispatch(setHallCapacity(''))
            store.dispatch(setHallNameError(hallNameError))
            store.dispatch(setHallCapacityError(hallCapacityError))
            return
        }

        if (popupMode === 'edit') {
            const prevHallData =  store.getState(prevHallDataAtom)
            if (isEqual(prevHallData, {
                name: hallName,
                capacity: +hallCapacity,
            })) {
                store.dispatch(close())
                return
            }
            
            store.dispatch(saveHall({
                id: verify(hallId),
                name: hallName,
                capacity: +hallCapacity,
            }))
        }
        else {
            store.dispatch(createHall({
                name: hallName,
                capacity: +hallCapacity,
            }))
        }
    }
)

const editHallPopupAtom = combine({
    opened: openedAtom,
    popupMode: popupModeAtom,
    prevHallData: prevHallDataAtom,
    hallId: hallIdAtom,
    hallName: hallNameAtom,
    hallCapacity: hallCapacityAtom,
    hallNameError: hallNameErrorAtom,
    hallCapacityError: hallCapacityErrorAtom,
    submitButtonLoading: submitButtonLoadingAtom,
})

const editHallPopupActions = {
    setOpened,
    open,
    close,
    setHallName,
    setHallCapacity,
    setHallNameError,
    setHallCapacityError,
    submit,
}

export {
    editHallPopupAtom,
    editHallPopupActions,
}