import {declareAtomWithSetter} from "../core/reatom/declareAtomWithSetter";
import { initUserDataAction } from "../currentUser/actions/initUser";

const [isLoadingAppAtom, setIsLoadingApp] = declareAtomWithSetter('app.isLoading', true, on => [
    on(initUserDataAction.done, () => false),
    on(initUserDataAction.fail, () => false)
])

export {
    isLoadingAppAtom,
    setIsLoadingApp,
}
