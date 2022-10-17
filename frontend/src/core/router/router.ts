import {History} from "history";

const AUTH = '/auth'
const ADMIN = '/admin'
const USER = '/user'
const SCHEDULE = '/schedule'
const MARK = '/mark'
const SETTINGS = '/settings'
const DASHBOARD = '/dashboard'

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
function generateUserUrl() {
    return `${ADMIN}${USER}`
}
function openUser(push: boolean = false) {
    replaceUrl(generateUserUrl(), push)
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
    }
}

export {
    initRouterHistory,
    Router,
}