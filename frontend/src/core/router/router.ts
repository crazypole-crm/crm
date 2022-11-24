import {History} from "history";

const AUTH = '/auth'
const ADMIN = '/admin'
const USERS_LIST = '/users-list'
const SCHEDULE = '/schedule'
const DIRECTIONS = '/courses'
const HALLS = '/halls'

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
function generateUsersListUrl() {
    return `${ADMIN}${USERS_LIST}`
}
function openUsersList(push: boolean = false) {
    replaceUrl(generateUsersListUrl(), push)
}
function generateScheduleUrl() {
    return `${ADMIN}${SCHEDULE}`
}
function openSchedule(push: boolean = false) {
    replaceUrl(generateScheduleUrl(), push)
}
function generateDirectionsUrl() {
    return `${ADMIN}${DIRECTIONS}`
}
function openDirections(push: boolean = false) {
    replaceUrl(generateDirectionsUrl(), push)
}
function generateHallsUrl() {
    return `${ADMIN}${HALLS}`
}
function openHalls(push: boolean = false) {
    replaceUrl(generateHallsUrl(), push)
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
    UsersList: {
        open: openUsersList,
        url: generateUsersListUrl,
    },
    Schedule: {
        open: openSchedule,
        url: generateScheduleUrl,
    },
    Directions: {
        open: openDirections,
        url: generateDirectionsUrl,
    },
    Halls: {
        open: openHalls,
        url: generateHallsUrl,
    }
}

export {
    initRouterHistory,
    Router,
}