import styles from "./RegistrationsLayoutWrapper.module.css";
import {useAction, useAtom} from "@reatom/react";
import {loadDirections} from "../../viewModel/direction/loadDirections";
import {loadHalls} from "../../viewModel/hall/loadHalls";
import {loadAllTrainers} from "../../viewModel/users/loadUsers";
import {useEffect} from "react";
import {Preloader} from "../../../common/preloader/Preloader";
import {RegistrationsLayout} from "./RegistrationsLayout";
import {registrationsPageLoadingAtom} from "../../viewModel/registrations/registrationsPageLoading";
import {loadRegistrations} from "../../viewModel/registrations/loadRegistrations";

function RegistrationsLayoutWrapper() {
    const registrationsPageLoading = useAtom(registrationsPageLoadingAtom)
    const handleLoadDirection = useAction(loadDirections)
    const handleLoadHalls = useAction(loadHalls)
    const handleLoadAllTrainers = useAction(loadAllTrainers)
    const handleLoadRegistrations = useAction(loadRegistrations)

    useEffect(() => {
        handleLoadDirection()
        handleLoadHalls()
        handleLoadAllTrainers()
        handleLoadRegistrations()
    }, [handleLoadDirection, handleLoadHalls, handleLoadAllTrainers, handleLoadRegistrations])

    return (
        <div className={styles.registrationsLayoutWrapper}>
            {
                registrationsPageLoading
                    ? <Preloader size={'large'} />
                    : <RegistrationsLayout />
            }
        </div>
    )
}

export {
    RegistrationsLayoutWrapper,
}
