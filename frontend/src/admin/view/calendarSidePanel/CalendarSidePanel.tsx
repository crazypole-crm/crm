import React, {FC} from 'react';
import CalendarApp from "./calendar/CalendarApp";
import {FilterData} from "../../viewModel/filterPanel/FilterData";
import FilterPanel from "./filterPanel/FilterPanel";
import styles from "./CalendarSidePanel.module.css"

type CalendarSidePanelProps = {
    selectedDate: Date,
    filterList: FilterData[]
    selectedFilters: string[]
    onDateChange: (date: Date) => void,
    onFiltersChange: (selectedFilters: string[]) => void
}

const CalendarSidePanel: FC<CalendarSidePanelProps> = ({
    selectedDate,
    filterList,
    onDateChange,
    onFiltersChange,
    selectedFilters,
}) => {
    return (
        <div className={styles.panel}>
            <CalendarApp
                selectedDate={selectedDate}
                onDateChange={onDateChange}
            />
            <FilterPanel
                selectedFilters={selectedFilters}
                filterList={filterList}
                onFiltersChange={onFiltersChange}
            />
        </div>
    );
};

export {
    CalendarSidePanel
};