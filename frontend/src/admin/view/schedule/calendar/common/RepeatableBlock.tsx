import styles from "./RepeatableBlock.module.css";
import {Checkbox} from "antd";
import React from "react";

type RepeatableBlockProps = {
    repeatable: boolean,
    setRepeatable: (value: boolean) => void,
}

function RepeatableBlock({
    repeatable,
    setRepeatable,
}: RepeatableBlockProps) {
    return (
        <div className={styles.repeatableBlock}>
            <span className={styles.blockTitle}>{'Повторить на всё расписание:'}</span>
            <Checkbox
                className={styles.checkbox}
                value={repeatable}
                onChange={e => setRepeatable(e.target.checked)}
            />
        </div>
    )
}

export {
    RepeatableBlock,
}