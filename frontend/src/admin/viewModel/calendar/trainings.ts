import {declareMapAtom} from "../../../core/reatom/declareMapAtom";
import {TrainingData} from "./TrainingData";

const {
    atom: trainingsAtom,
    updateItems: updateTrainings,
    updateItem: updateTraining,
    removeItems: removeTrainings,
    setNewItems: setNewTrainings,
} = declareMapAtom<TrainingData>(
    'trainings',
    training => training.id,
)

const trainingsActions = {
    updateTrainings,
    updateTraining,
    removeTrainings,
    setNewTrainings,
}

export {
    trainingsAtom,
    trainingsActions,
}