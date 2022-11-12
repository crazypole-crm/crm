import React from "react";
import styles from './FieldBlock.module.css'

type FieldBlockProps = {
    title: string,
    content: JSX.Element,
    error?: boolean
}

function FieldBlock({
    title,
    content,
    error = false,
}: FieldBlockProps) {
    return (
        <div className={styles.blockContainer}>
            <span className={styles.blockTitle}>{title}</span>
            <div className={styles.blockContent}>{content}</div>
            {error && <div className={styles.errorMessage}>
                {'Поле обязательное'}
            </div>}
        </div>
    )
}

export {
    FieldBlock,
}