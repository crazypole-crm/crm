import {useAction, useAtom} from "@reatom/react"
import {List} from "antd"
import {useEffect, useMemo, useState} from "react"
import {directionsAtom} from "../../viewModel/direction/directions"
import {hallsAtom} from "../../viewModel/hall/halls"
import {registrationsAtom} from "../../viewModel/registrations/registrations"
import {trainersAtom} from "../../viewModel/users/users"
import {CalendarSidePanel} from "../calendarSidePanel/CalendarSidePanel"
import {
    calculateWeekStartDate,
    getFilteredTrainings,
    getFilterItems,
    getPeriod,
    getValidTrainings
} from "../schedule/Calendar"
import {RegistrationsListItem} from "./RegistrationsListItem"
import styles from './RegistrationsLayout.module.css'
import {trainingsAtom} from "../../viewModel/calendar/trainings";
import {
    lastLoadedPeriodAtom,
    loadTrainingsForPeriod,
    trainingsLoadingAtom
} from "../../viewModel/calendar/calendaActions/loadTrainingsForPeriod";
import {TrainingData} from "../../viewModel/calendar/TrainingData";
import {MapItems} from "../../../core/reatom/declareMapAtom";
import {RegistrationData} from "../../viewModel/calendar/trainingClientsPopup/trainingClientsPopup";

function getCurrentUserTrainings(trainings: MapItems<TrainingData>, registrations: MapItems<RegistrationData>): TrainingData[] {
    return Object.values(trainings).filter(trainingData => {
        return !!registrations[trainingData.id]
    })
}

function RegistrationsLayout() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(Date.now()))
    const [selectedFilters, setSelectedFilters] = useState<string[]>([])
    const registrations = useAtom(registrationsAtom)
    const halls = useAtom(hallsAtom)
    const directions = useAtom(directionsAtom)
    const trainers = useAtom(trainersAtom)
    const trainings = useAtom(trainingsAtom)
    const lastLoadedPeriod = useAtom(lastLoadedPeriodAtom)
    const trainingsLoading = useAtom(trainingsLoadingAtom)
    const handleLoadTrainings = useAction(loadTrainingsForPeriod)

    const weekDateStart = useMemo(() => calculateWeekStartDate(selectedDate, 'week'), [selectedDate])

    useEffect(() => {
        const period = getPeriod('week', weekDateStart, {
            dayEndTime: {
                minutes: 59,
                hour: 23,
            },
            dayStartTime: {
                minutes: 0,
                hour: 0,
            },
        })

        if (!lastLoadedPeriod
            || period.startDate.getTime() !== lastLoadedPeriod.startDate.getTime()
            || period.endDate.getTime() !== lastLoadedPeriod.endDate.getTime()) {
            handleLoadTrainings(period)
        }
    }, [selectedDate, weekDateStart, handleLoadTrainings, lastLoadedPeriod])
    

    const filtersList = useMemo(() => getFilterItems(
        Object.values(directions),
        Object.values(halls),
        trainers
    ), [directions, halls, trainers])

    const currentUserTrainings = useMemo(() => getCurrentUserTrainings(trainings, registrations), [trainings, registrations])
    const validTrainings = useMemo(() => getValidTrainings(currentUserTrainings, trainers, directions, halls), [currentUserTrainings, trainers, directions, halls])
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
                loading={trainingsLoading}
                dataSource={filteredTrainings}
                locale={{
                    emptyText: 'Записей в этот период нет'
                }}
                renderItem={(item) => (
                    <List.Item>
                        <RegistrationsListItem trainingData={item} />
                    </List.Item>
                )}
            />
        </div>
    )
}

export {
    RegistrationsLayout,
}