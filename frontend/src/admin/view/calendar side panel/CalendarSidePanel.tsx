import React, {FC} from 'react';
import CalendarApp from "./calendar/CalendarApp";
import {FilterData} from "../../viewModel/filterPanel/FilterData";
import FilterPanel from "./filter panel/FilterPanel";

type CalendarSidePanelProps = {
    selectedDate: Date,
    filterList: FilterData[]
    onDateChange: (date: Date) => void,
    onFilterPanelChange: (selectedFilters: string[]) => void
}

const CalendarSidePanel: FC<CalendarSidePanelProps> = ({selectedDate, filterList, onDateChange, onFilterPanelChange}) => {
    return (
        <div>
            <CalendarApp selectedDate={selectedDate} onDateChange={(value: Date) => {onDateChange(value)}}/>
            <FilterPanel filterList={filterList} onFilterPanelChange={onFilterPanelChange}></FilterPanel>
        </div>
    );
};

export default CalendarSidePanel;