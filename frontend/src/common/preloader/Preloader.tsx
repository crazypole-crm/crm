import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';
import styles from './Preloader.module.css'

type PreloaderSize = 'small' | 'normal' | 'large'

type PreloaderProps = {
    size?: PreloaderSize,
}

function getPreloaderFontSize(size: PreloaderSize): number {
    switch (size) {
        case 'small':
            return 15
        case 'normal':
            return 25
        case 'large':
            return 40
    }
}

const Preloader: React.FC<PreloaderProps> = ({
    size = 'normal',
}) => {
    const antIcon = <LoadingOutlined
        style={{ fontSize: getPreloaderFontSize(size) }}
        spin 
    />;

    return (
        <Spin indicator={antIcon} className={styles.preloader} />
    )
}

export {
    Preloader,
};