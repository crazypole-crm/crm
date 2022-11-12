import {UserRole} from "../admin/viewModel/users/UserData";

type UserModel = AuthenticatedUserModel | UnautenticatedUserModel;

type AuthenticatedUserModel = {
    isAuthUser: true;
    id: string,
    email: string,
    avatarUrl: string,
    role: UserRole,
    phone?: string,
    firstName?: string,
    lastName?: string,
    middleName?: string,
    birthDay?: Date,
};

type UnautenticatedUserModel = {
    isAuthUser: false;
};

export type {
    AuthenticatedUserModel,
    UnautenticatedUserModel,
    UserModel,
}