
export type UserRole = 'admin' | 'trainer' | 'client'

export type UserData = {
    id: string,
    email: string,
    avatarUrl: string,
    role: UserRole,
    phone?: string,
    firstName?: string,
    lastName?: string,
    middleName?: string,
    birthDay?: Date,
    lastVisit?: Date,
}