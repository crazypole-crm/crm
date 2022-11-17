import {History} from "history";

const AUTH = '/auth'
const ADMIN = '/admin'
const USER = '/user'
const USERS_LIST = '/users-list'
const SCHEDULE = '/schedule'
const MARK = '/mark'
const SETTINGS = '/settings'
const DASHBOARD = '/dashboard'
const DIRECTIONS = '/courses'

let RouterHistory: History|null = null

function initRouterHistory(history: History) {
    RouterHistory = history
}

function replaceUrl(path: string, push: boolean = false) {
    if (!RouterHistory) {
        throw new Error('router not initialized')
    }
    push
        ? RouterHistory.push(path)
        : RouterHistory.replace(path)
}

function generateAuthUrl() {
    return `${AUTH}`
}
function openAuth(push: boolean = false) {
    replaceUrl(generateAuthUrl(), push)
}
function generateAdminUrl() {
    return `${ADMIN}`
}
function openAdmin(push: boolean = false) {
    replaceUrl(generateAdminUrl(), push)
}
function generateUserUrl(userId: string) {
    return `${ADMIN}${USER}/${userId}`
}
function openUser(userId: string, push: boolean = false) {
    replaceUrl(generateUserUrl(userId), push)
}
function generateUsersListUrl() {
    return `${ADMIN}${USERS_LIST}`
}
function openUsersList(push: boolean = false) {
    replaceUrl(generateUsersListUrl(), push)
}
function generateMarkUrl() {
    return `${ADMIN}${MARK}`
}
function openMark(push: boolean = false) {
    replaceUrl(generateMarkUrl(), push)
}
function generateScheduleUrl() {
    return `${ADMIN}${SCHEDULE}`
}
function openSchedule(push: boolean = false) {
    replaceUrl(generateScheduleUrl(), push)
}
function generateSettingsUrl() {
    return `${ADMIN}${SETTINGS}`
}
function openSettings(push: boolean = false) {
    replaceUrl(generateSettingsUrl(), push)
}
function generateDashboardUrl() {
    return `${ADMIN}${DASHBOARD}`
}
function openDashboard(push: boolean = false) {
    replaceUrl(generateDashboardUrl(), push)
}
function generateDirectionsUrl() {
    return `${ADMIN}${DIRECTIONS}`
}
function openDirections(push: boolean = false) {
    replaceUrl(generateDirectionsUrl(), push)
}

const Router = {
    Auth: {
        open: openAuth,
        url: generateAuthUrl,
    },
    Admin: {
        open: openAdmin,
        url: generateAdminUrl,
    },
    User: {
        open: openUser,
        url: generateUserUrl,
    },
    UsersList: {
        open: openUsersList,
        url: generateUsersListUrl,
    },
    Schedule: {
        open: openSchedule,
        url: generateScheduleUrl,
    },
    Mark: {
        open: openMark,
        url: generateMarkUrl,
    },
    Settings: {
        open: openSettings,
        url: generateSettingsUrl,
    },
    Dashboard: {
        open: openDashboard,
        url: generateDashboardUrl,
    },
    Directions: {
        open: openDirections,
        url: generateDirectionsUrl,
    }
}

export {
    initRouterHistory,
    Router,
}