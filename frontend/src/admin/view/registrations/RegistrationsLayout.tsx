import { useAction, useAtom } from "@reatom/react"
import { List } from "antd"
import { useEffect, useMemo, useState } from "react"
import { authorizedCurrentUser } from "../../../currentUser/currentUser"
import { directionsAtom } from "../../viewModel/direction/directions"
import { loadDirections } from "../../viewModel/direction/loadDirections"
import { hallsAtom } from "../../viewModel/hall/halls"
import { loadHalls } from "../../viewModel/hall/loadHalls"
import { loadRegistrations, registrationsLoadingAtom } from "../../viewModel/registrations/loadRegistrations"
import { registrationsAtom } from "../../viewModel/registrations/registrations"
import { loadAllUsersData } from "../../viewModel/users/loadUsers"
import { trainersAtom } from "../../viewModel/users/users"
import { CalendarSidePanel } from "../calendarSidePanel/CalendarSidePanel"
import { calculateWeekStartDate, getFilterItems } from "../schedule/Calendar"
import { RegistrationsListItem } from "./RegistrationsListItem"
import styles from './RegistrationsLayout.module.css'
import { UserRegistrationData } from "../../viewModel/registrations/UserRegistrationData"
import { UserData } from "../../viewModel/users/UserData"
import { MapItems } from "../../../core/reatom/declareMapAtom"
import { DirectionData } from "../../viewModel/direction/DirectionData"
import { HallData } from "../../viewModel/hall/HallData"
import { FilterData } from "../../viewModel/filterPanel/FilterData"

function setStartPeriodTime(startPeriod: Date) {
    startPeriod.setHours(8)
    startPeriod.setMinutes(0)
    startPeriod.setMilliseconds(0)
    startPeriod.setSeconds(0)
}

function getEndPeriod(startPeriod: Date): Date {
    const endPeriod = new Date(startPeriod)
    endPeriod.setDate(endPeriod.getDate() + 6)
    endPeriod.setHours(23)
    endPeriod.setMinutes(0)
    endPeriod.setMilliseconds(0)
    endPeriod.setSeconds(0)
    return endPeriod
}

function getValidTrainings(trainings: UserRegistrationData[], trainers: Array<UserData>, directions: MapItems<DirectionData>, halls: MapItems<HallData>) {
    return trainings.filter(training => {
        const trainer = trainers.find(trainer => trainer.id === training.trainingData.trainerId)
        const direction = directions[training.trainingData.directionId]
        const hall = halls[training.trainingData.hallId]

        return !!trainer && !!direction && !!hall
    })
}

function getFilteredTrainings(trainings: UserRegistrationData[], filtersList: FilterData[], selectedFilters: string[]) {
    if (!selectedFilters.length) {
        return trainings
    }
    return trainings.filter(training => {
        return filtersList.every(filter => {
            const currFilters = filter.items.filter(item => selectedFilters.includes(item.id))
            if (currFilters.length) 
                return currFilters.some(currFilter => {
                    return [training.trainingData.hallId, training.trainingData.trainerId, training.trainingData.directionId].includes(currFilter.id)
                })
            return true
        })
    })
}

function RegistrationsLayout() {
    const authorizedUser = useAtom(authorizedCurrentUser)
    const registrations = useAtom(registrationsAtom)
    const registrationsLoading = useAtom(registrationsLoadingAtom)
    const halls = useAtom(hallsAtom)
    const directions = useAtom(directionsAtom)
    const trainers = useAtom(trainersAtom)
    const handleLoadRegistrations = useAction(loadRegistrations)

    const [selectedDate, setSelectedDate] = useState<Date>(new Date(Date.now()))
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])

    const startPeriod = useMemo(() => calculateWeekStartDate(selectedDate, 'week'), [selectedDate])

    useEffect(() => {
        setStartPeriodTime(startPeriod)
        const endPeriod = getEndPeriod(startPeriod)
        handleLoadRegistrations({userId: authorizedUser.id, startDate: startPeriod, endDate: endPeriod})
    }, [handleLoadRegistrations, authorizedUser, startPeriod])

    const handleLoadDirection = useAction(loadDirections)
    const handleLoadHalls = useAction(loadHalls)
    const handleLoadAllUsers = useAction(loadAllUsersData)

    useEffect(() => {
        handleLoadDirection()
        handleLoadHalls()
        handleLoadAllUsers()
    }, [handleLoadDirection, handleLoadHalls, handleLoadAllUsers])
    

    const filtersList = useMemo(() => getFilterItems(
        Object.values(directions),
        Object.values(halls),
        trainers
    ), [directions, halls, trainers])

    const validTrainings = useMemo(() => getValidTrainings(Object.values(registrations), trainers, directions, halls), [registrations, trainers, directions, halls])
    const filteredTrainings = useMemo(() => getFilteredTrainings(validTrainings, filtersList, selectedFilters), [validTrainings, filtersList, selectedFilters])

    return (
        <div className={styles.layout}>
            <CalendarSidePanel
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                filterList={filtersList}
                selectedFilters={selectedFilters}
                onFiltersChange={setSelectedFilters}
            />
            <List
                className={styles.list}
                header={<div className={styles.listTitle}>Мои записи</div>}
                bordered
                itemLayout="horizontal"
                loading={registrationsLoading}
                dataSource={filteredTrainings}
                renderItem={(registrationData) => (
                    <List.Item>
                        <RegistrationsListItem registrationData={registrationData} />
                    </List.Item>
                )}
            />
        </div>
    )
}

export {
    RegistrationsLayout,
}