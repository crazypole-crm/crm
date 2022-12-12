import { declareAtomWithSetter } from "../../../../core/reatom/declareAtomWithSetter";
import { submitDeleteHallsPopupActions } from "./submitDeleteHallsPopup";

const [selectedHallsRowKeysAtom, setSelectedHallsRowKeys] = declareAtomWithSetter<React.Key[]>('hallsSelectedRows', [], on => [
    on(submitDeleteHallsPopupActions.submit, () => [])
])

export {
    selectedHallsRowKeysAtom,
    setSelectedHallsRowKeys
}