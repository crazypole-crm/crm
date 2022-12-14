import {TrainingData} from "./TrainingData";
import {Api_TrainingData} from "../../../api/calendarApi";
import {getValueByCheckedKey} from "../../../core/getValueByCheckedKey";
import {convertTrainingDataToDate} from "./DataConverting";


function remapTrainingDataToApiTrainingData(trainingData: Omit<TrainingData, 'id' | 'baseId' | 'isCanceled' | 'availableRegistrationsCount'>): Omit<Api_TrainingData, 'trainingId' | 'baseTrainingId' | 'isCanceled' | 'availableRegistrationsCount'> {
    return {
        type: getValueByCheckedKey(trainingData.type, {
            'grouped': 'group',
            'individual': 'individual',
        }),
        hallId: trainingData.hallId,
        description: trainingData.description,
        endDate: convertTrainingDataToDate(trainingData.date, trainingData.timeEnd).getTime(),
        courseId: trainingData.directionId,
        trainerId: trainingData.trainerId,
        startDate: convertTrainingDataToDate(trainingData.date, trainingData.timeStart).getTime(),
        maxRegistrationsCount: trainingData.maxRegistrationsCount,
    }
}

export {
    remapTrainingDataToApiTrainingData,
}