import {declareAtomWithSetter} from "../core/reatom/declareAtomWithSetter";

const [isLoadingAppAtom, setIsLoadingApp] = declareAtomWithSetter('app.isLoading', true)

export {
    isLoadingAppAtom,
    setIsLoadingApp,
}
