import { remapApiTrainingDataToTrainingData } from "../admin/viewModel/calendar/calendaActions/loadTrainingsForPeriod";
import { TrainingData } from "../admin/viewModel/calendar/TrainingData";
import { UserRegistrationData } from "../admin/viewModel/registrations/UserRegistrationData";
import { CalendarApi } from "./calendarApi";

const mockRegistrations = [
    {
        registrationId: '1',
        trainingId: '3f27fa59-3850-4a3b-b05a-007abb18a8be',
        userId: 'ddc9ae7d-12ab-4b31-be7c-87207abb1e33'
    },
    {
        registrationId: '2',
        trainingId: '51b50536-27ac-4bc4-aae2-ee2672614473',
        userId: 'ddc9ae7d-12ab-4b31-be7c-87207abb1e33'
    }
]

function getUserRegistrationsForPeriod(userId: string, startDate: Date, endDate: Date): Promise<UserRegistrationData[]> {
    return CalendarApi.getTrainingsForPeriod(startDate, endDate)
        .then ((allTrainings) => {
            const userRegisrtations = mockRegistrations.filter((registration) => registration.userId === userId)
            const allRemappedTrainings = remapApiTrainingDataToTrainingData(allTrainings)
            const userTrainings = userRegisrtations.map((registration) => {
                const training = allRemappedTrainings.find((training) => training.id === registration.trainingId)
                return {
                    id: registration.registrationId,
                    trainingData: training || {} as TrainingData,
                }
            })
            return Promise.resolve(userTrainings)
        })
}

const RegistrationsApi = {
    getUserRegistrationsForPeriod
}

export {
    RegistrationsApi,
}