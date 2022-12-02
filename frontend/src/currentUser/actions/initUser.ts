import { CurrentUserApi } from "../../api/currentUserApi";
import { declareAsyncAction } from "../../core/reatom/declareAsyncAction";
import { currentUserActions } from "../currentUser";
import { UserModel } from "../UserModel";
import {remapApiRolToModelRole} from "../../common/role/remapApiRolToModelRole";

const initUserDataAction = declareAsyncAction<void>(
    'currentUser.init',
    (_, store) => {
        return CurrentUserApi.getUserData()
            .then((data) => {
                const modelUserData: UserModel = {
                    ...data,
                    isAuthUser: true,
                    birthDay: data.birthDay ? new Date(Number(data.birthDay)) : undefined,
                    lastVisit: data.lastVisit ? new Date(Number(data.lastVisit)) : undefined,
                    role: remapApiRolToModelRole(2),
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