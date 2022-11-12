import {useAtomWithSelector} from "../../../../../core/reatom/useAtomWithSelector";
import {
    editTrainingPopupActions,
    editTrainingPopupAtom
} from "../../../../viewModel/calendar/editTrainingPopup/editTrainingPopup";
import {useAction} from "@reatom/react";
import React, {useMemo} from "react";
import moment from "moment/moment";
import {DatePicker, DatePickerProps} from "antd";
import ruRU from "antd/lib/calendar/locale/ru_RU";
import {TrainingDate} from "../../../../viewModel/calendar/TrainingData";


type TrainingDatePickerProps = {
    trainingDate: TrainingDate,
    setStrainingDate: (value: TrainingDate) => void,
}

function TrainingDatePicker({
    setStrainingDate,
    trainingDate,
}: TrainingDatePickerProps) {

    const momentDate = useMemo(() => moment({
        year: trainingDate.year,
        month: trainingDate.month,
        date: trainingDate.date
    }), [trainingDate])

    const onChange: DatePickerProps['onChange'] = (value) => {
        if (value) {
            const date = value.toDate()
            setStrainingDate({
                date: date.getDate(),
                month: date.getMonth(),
                year: date.getFullYear(),
            })
        }
    }

    return <DatePicker value={momentDate} onChange={onChange} locale={ruRU} />
}

export {
    TrainingDatePicker,
}