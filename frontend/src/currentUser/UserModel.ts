import {UserData, UserRole} from "../admin/viewModel/users/UserData";

type UserModel = AuthenticatedUserModel | UnautenticatedUserModel;

type AuthenticatedUserModel = UserData & {
    isAuthUser: true;
};

type UnautenticatedUserModel = {
    isAuthUser: false;
};

export type {
    AuthenticatedUserModel,
    UnautenticatedUserModel,
    UserModel,
}