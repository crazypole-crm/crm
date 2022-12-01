import {UserRole} from "../../admin/viewModel/users/UserData";
import {Api_Role} from "./Api_Role";

const roles: UserRole[] = ['client', 'trainer', 'admin']

function remapApiRolToModelRole(apiRole: Api_Role): UserRole {
    return roles[apiRole]
}

function remapModelRoleToApiRole(modelRole: UserRole): Api_Role {
    return roles.indexOf(modelRole) as Api_Role
}

export {
    remapApiRolToModelRole,
    remapModelRoleToApiRole,
}