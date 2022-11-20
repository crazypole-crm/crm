import { declareAtomWithSetter } from "../../../../core/reatom/declareAtomWithSetter";
import { deleteDirectionsPopupActions } from "./deleteDirectionsPopup";

const [selectedDirectionsRowKeysAtom, setSelectedDirectionsRowKeys] = declareAtomWithSetter<React.Key[]>('directionsSelectedRows', [], on => [
    on(deleteDirectionsPopupActions.submit, () => [])
])

export {
    selectedDirectionsRowKeysAtom,
    setSelectedDirectionsRowKeys
}