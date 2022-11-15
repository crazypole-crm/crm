import {useAtom} from "@reatom/react";
import {trainersAtom} from "../../../../viewModel/users/users";
import React, {useMemo} from "react";
import styles from "./TrainingTrainer.module.css";
import {Avatar, Select} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {getFullName} from "../../../../../common/name";


type TrainingTrainerProps = {
    trainerId: string | null,
    setTrainerId: (value: string) => void,
    trainerError?: boolean
}

function TrainingTrainer({
    trainerId,
    setTrainerId,
    trainerError = false,
}: TrainingTrainerProps) {
    const trainers = useAtom(trainersAtom)

    const trainer = useMemo(() => trainerId && trainers.find(trainerData => trainerData.id === trainerId), [trainers, trainerId])

    const options = useMemo(() => Object.values(trainers).map(trainerData => ({
        value: trainerData.id,
        label: getFullName(trainerData) || trainerData.email
    })), [trainers])

    return (
        <div className={styles.trainerRow}>
            {trainer && <Avatar size={50} icon={<UserOutlined />} src={trainer.avatarUrl || null} />}
            <Select
                status={trainerError ? 'error' : ''}
                placeholder={'Тренер'}
                showSearch
                value={trainer && trainer.id}
                onChange={id => setTrainerId(id)}
                options={options}
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                style={{
                    width: 200,
                }}
            />
        </div>
    )
}

export {
    TrainingTrainer,
}