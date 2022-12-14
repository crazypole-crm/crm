import {History, Location} from "history";
import {HallsLayout} from "../../admin/view/halls/HallsLayout";
import {ScheduleLayoutWrapper} from "../../admin/view/schedule/ScheduleLayoutWrapper";
import {UsersLayout} from "../../admin/view/users/UsersLayout";
import {DirectionsLayout} from "../../admin/view/directions/DirectionsLayout";

const AUTH = '/auth'
const ADMIN = '/admin'
const USERS_LIST = '/users-list'
const SCHEDULE = '/schedule'
const DIRECTIONS = '/courses'
const HALLS = '/halls'

let RouterHistory: History|null = null

function initRouterHistory(history: History) {
    RouterHistory = history
    history.listen(location => onLocationChanged(location))
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

let onCalendarPageOpened: (() => void) | null = null

function setOnCalendarPageOpened(handler: () => void) {
    onCalendarPageOpened = handler
}

function onLocationChanged(location: Location) {
    switch (location.pathname) {
        case Router.Schedule.url():
            onCalendarPageOpened && onCalendarPageOpened()
    }
}

const adminRoutes = [
    {path: generateScheduleUrl(), component: ScheduleLayoutWrapper},
    {path: generateUsersListUrl(), component: UsersLayout},
    {path: generateDirectionsUrl(), component: DirectionsLayout},
    {path: generateHallsUrl(), component: HallsLayout}
]

const clientRoutes = [
    {path: generateScheduleUrl(), component: ScheduleLayoutWrapper}
]

export {
    initRouterHistory,
    setOnCalendarPageOpened,
    Router,
    adminRoutes,
    clientRoutes
}