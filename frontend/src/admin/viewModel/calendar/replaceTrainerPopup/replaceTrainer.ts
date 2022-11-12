import {combine, declareAction, declareAtom} from "@reatom/core";
import {declareAtomWithSetter} from "../../../../core/reatom/declareAtomWithSetter";

type OpenPayload = {
    id: string
    trainerId: string,
}

const open = declareAction<OpenPayload>('replaceTrainerPopup.open')
const close = declareAction('replaceTrainerPopup.close')

const openedAtom = declareAtom('replaceTrainerPopup.opened', false, on => [
    on(open, () => true),
    on(close, () => false),
])

const trainingIdAtom = declareAtom('replaceTrainerPopup.trainingId', '', on => [
    on(open, (_, {id}) => id),
])

const [trainerIdAtom, setTrainerId] = declareAtomWithSetter('replaceTrainerPopup.trainerId', '', on => [
    on(open, (_, {trainerId}) => trainerId)
])

const [repeatAtom, setRepeat] = declareAtomWithSetter('replaceTrainerPopup.repeat', false)

const submit = declareAction('replaceTrainerPopup.submit',
    (_, store) => {
        const trainingId = store.getState(trainingIdAtom)
        const trainerId = store.getState(trainerIdAtom)

        console.log('replace trainer', trainerId)
        store.dispatch(close())
    }
)

const replaceTrainerPopupAtom = combine({
    opened: openedAtom,
    trainingId: trainingIdAtom,
    trainerId: trainerIdAtom,
    repeat: repeatAtom,
})

const replaceTrainerPopupActions = {
    open,
    close,
    setTrainerId,
    setRepeat,
    submit,
}

export {
    replaceTrainerPopupActions,
    replaceTrainerPopupAtom,
}