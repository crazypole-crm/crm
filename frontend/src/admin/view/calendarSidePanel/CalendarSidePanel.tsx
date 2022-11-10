import React, {FC} from 'react';
import CalendarApp from "./calendar/CalendarApp";
import {FilterData} from "../../viewModel/filterPanel/FilterData";
import FilterPanel from "./filterPanel/FilterPanel";
import styles from "./CalendarSidePanel.module.css"

type CalendarSidePanelProps = {
    selectedDate: Date,
    filterList: FilterData[]
    onDateChange: (date: Date) => void,
    onFilterPanelChange: (selectedFilters: string[]) => void
}

const CalendarSidePanel: FC<CalendarSidePanelProps> = ({selectedDate, filterList, onDateChange, onFilterPanelChange}) => {
    return (
        <div className={styles.panel}>
            <CalendarApp selectedDate={selectedDate} onDateChange={(value: Date) => {onDateChange(value)}}/>
            <FilterPanel filterList={filterList} onFilterPanelChange={onFilterPanelChange}></FilterPanel>
        </div>
    );
};

export default CalendarSidePanel;