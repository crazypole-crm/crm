import {declareAsyncAction} from "../../../core/reatom/declareAsyncAction";
import {CalendarApi} from "../../../api/calendarApi";
import {directionsActions, directionsAtom} from "./directions";
import {processStandardError} from "../../../core/error/processStandardError";
import {declareAtom} from "@reatom/core";
import {DirectionsApi} from "../../../api/directionsApi";
import {DirectionData} from "./DirectionData";

function getMockDirections(): DirectionData[] {
    return [
        {
            id: 'direction1',
            name: 'Pole dance начинающие'
        },
        {
            id: 'direction2',
            name: 'Pole exotic'
        },
        {
            id: 'direction3',
            name: 'Йога'
        },
        {
            id: 'direction4',
            name: 'Танцы'
        }
    ]
}

const loadDirections = declareAsyncAction<void>('directions.load',
    (_, store) => {
        return DirectionsApi.getDirections()
            .then(directions => {
                const allDirections = directions.concat(getMockDirections())
                store.dispatch(directionsActions.updateDirections(allDirections))
            })
            .catch(() => {
                processStandardError()
            })
    }
)

const directionsLoadingAtom = declareAtom('directions.loading', true, on => [
    on(loadDirections, () => true),
    on(loadDirections.done, () => false),
    on(loadDirections.fail, () => false),
])

export {
    loadDirections,
    directionsLoadingAtom,
}