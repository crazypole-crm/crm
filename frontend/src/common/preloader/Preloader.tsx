import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';
import { getValueByCheckedKey } from '../../core/getValueByCheckedKey';
import styles from './Preloader.module.css'

type PreloaderSize = 'small' | 'normal' | 'large'

type PreloaderProps = {
    size?: PreloaderSize,
}

function getPreloaderFontSize(size: PreloaderSize): number {
    return getValueByCheckedKey(size, {
        'small': 15,
        'normal': 25,
        'large': 40,
    })
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