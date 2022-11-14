import React from "react";
import styles from './EditUserPopupInputBlock.module.css'

type EditUserPopupInputBlockProps = {
    title: string,
    content: JSX.Element,
    errorEmpty?: boolean,
    errorIncorrect?: boolean,
}

function EditUserPopupInputBlock({
    title,
    content,
    errorEmpty = false,
    errorIncorrect = false,
}: EditUserPopupInputBlockProps) {
    return (
        <div className={styles.blockContainer}>
            <span className={styles.blockTitle}>{title}</span>
            <div className={styles.blockContent}>{content}</div>
            {errorEmpty && <div className={styles.errorMessage}>
                {'Поле обязательное'}
            </div>}
            {errorIncorrect && <div className={styles.errorMessage}>
                {'Неправильные данные'}
            </div>}
        </div>
    )
}

export {
    EditUserPopupInputBlock,
}