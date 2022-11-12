import { CurrentUserApi } from "../../api/currentUserApi";
import { declareAsyncAction } from "../../core/reatom/declareAsyncAction";
import { currentUserActions } from "../currentUser";
import { UserModel } from "../UserModel";


const initUserDataAction = declareAsyncAction<void>(
    'currentUser.init',
    (_, store) => {
        return CurrentUserApi.getUserData()
            .then((data) => {
                const modelUserData: UserModel = {
                    ...data,
                    isAuthUser: true,
                    birthDay: data.birthDay ? new Date(data.birthDay) : undefined,
                    lastVisit: data.lastVisit ? new Date(data.lastVisit) : undefined,
                    role: 'admin'
                }
                store.dispatch(currentUserActions.setCurrentUserData(modelUserData));
                return Promise.resolve()
            })
            .catch(() => {
                return Promise.reject()
            })
    }
);

export {
    initUserDataAction,
}