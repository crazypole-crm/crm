import { declareAtomWithSetter } from "../../../../core/reatom/declareAtomWithSetter";
import { deleteHallsPopupActions } from "./deleteHallsPopup";

const [selectedHallsRowKeysAtom, setSelectedHallsRowKeys] = declareAtomWithSetter<React.Key[]>('hallsSelectedRows', [], on => [
    on(deleteHallsPopupActions.submit, () => [])
])

export {
    selectedHallsRowKeysAtom,
    setSelectedHallsRowKeys
}