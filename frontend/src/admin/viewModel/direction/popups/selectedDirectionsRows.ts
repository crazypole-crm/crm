import { declareAtomWithSetter } from "../../../../core/reatom/declareAtomWithSetter";
import { submitDeleteDirectionsPopupActions } from "./submitDeleteDirectionsPopup";

const [selectedDirectionsRowKeysAtom, setSelectedDirectionsRowKeys] = declareAtomWithSetter<React.Key[]>('directionsSelectedRows', [], on => [
    on(submitDeleteDirectionsPopupActions.submit, () => [])
])

export {
    selectedDirectionsRowKeysAtom,
    setSelectedDirectionsRowKeys
}