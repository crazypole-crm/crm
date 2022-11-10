import {useAction, useAtom} from "@reatom/react";
import {loadDirections} from "../../viewModel/direction/loadDirections";
import {loadHalls} from "../../viewModel/hall/loadHalls";
import React, {useEffect} from "react";
import {calendarLoadingAtom} from "../../viewModel/calendar/calendarLoading";
import styles from './ScheduleLayoutWrapper.module.css'
import {Preloader} from "../../../common/preloader/Preloader";
import {FilterData} from "../../viewModel/filterPanel/FilterData";
import CalendarSidePanel from "../calendar side panel/CalendarSidePanel";

const onDateChangeExample = (value: Date) => {
    console.log(value.toString());
};

const onFilterPanelChangeExample = (selectedFilters: string[]) => {
    console.log('selected filters', selectedFilters);
};

const itemsExample : FilterData[] = [
    {id: "Зал",
        items:
            [
                {id: 'Пилонный зал'},
                {id: 'Воздушный зал'},
                {id: 'Малый зал'},
            ]},
    {id: "Направление",
        items:
            [
                {id: 'Pole dance'},
                {id: 'Pole exotic'},
                {id: 'Йога'},
            ]},
    {id: "Преподаватель",
        items:
            [
                {id: 'Амасова Алёна'},
                {id: 'Гаязова Алиса'},
                {id: 'Грищук Ульяна'},
            ]},
]

function ScheduleLayout() {

    const now = new Date();

    return (
        <div>
            <CalendarSidePanel selectedDate={now} filterList={itemsExample} onDateChange={onDateChangeExample} onFilterPanelChange={onFilterPanelChangeExample}/>
        </div>
    )
}

function ScheduleLayoutWrapper() {
    const calendarLoading = useAtom(calendarLoadingAtom)
    const handleLoadDirection = useAction(loadDirections)
    const handleLoadHalls = useAction(loadHalls)

    useEffect(() => {
        handleLoadDirection()
        handleLoadHalls()
    }, [handleLoadDirection, handleLoadHalls])

    return (
        <div className={styles.calendarLayoutWrapper}>
            {
                calendarLoading
                    ? <Preloader size={'large'} />
                    : <ScheduleLayout />
            }
        </div>
    )
}

export {
    ScheduleLayoutWrapper,
}