import React from "react";
import styles from './EditUserPopupInputBlock.module.css'

type EditUserPopupInputBlockProps = {
    title: string,
    content: JSX.Element,
    error?: string,
}

function EditUserPopupInputBlock({
    title,
    content,
    error,
}: EditUserPopupInputBlockProps) {
    return (
        <div className={styles.blockContainer}>
            <span className={styles.blockTitle}>{title}</span>
            <div className={styles.blockContent}>{content}</div>
            {!!error && <div className={styles.errorMessage}>
                {error}
            </div>}
        </div>
    )
}

export {
    EditUserPopupInputBlock,
}