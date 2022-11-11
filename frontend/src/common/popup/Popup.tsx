import React, {useRef} from "react";
import styles from './Popup.module.css'
import {Button} from "antd";
import {CloseOutlined} from "@ant-design/icons";

type PopupWithHeaderProps = {
    type: 'withHeader',
    headerText: string,
    content: JSX.Element,
    closePopup: () => void,
}

type PopupWithFooterProps = {
    type: 'withFooter',
    content: JSX.Element,
    acceptButton: JSX.Element,
    extraButton?: JSX.Element,
    closePopup: () => void,
}

type PopupWithHeaderAndFooterProps = {
    type: 'withHeaderAndFooter',
    headerText: string,
    content: JSX.Element,
    acceptButton: JSX.Element,
    extraButton?: JSX.Element,
    closePopup: () => void,
}

type PopupContentOnlyProps = {
    type: 'contentOnly',
    content: JSX.Element,
    closePopup: () => void,
}

type PropsType = PopupWithHeaderProps | PopupWithFooterProps | PopupWithHeaderAndFooterProps | PopupContentOnlyProps

type PopupHeaderProps = {
    headerText: string,
    closePopup: () => void,
}

type PopupFooterProps = {
    acceptButton: JSX.Element,
    extraButton?: JSX.Element
    closePopup: () => void,
}

function PopupHeader({
    headerText,
    closePopup,
}: PopupHeaderProps) {
    return (
        <div className={styles.popupHeader}>
            <div className={styles.popupTitle}>{headerText}</div>
            <Button
                icon={<CloseOutlined />}
                size={'small'}
                onClick={closePopup}
                className={styles.closeHeader}
            ></Button>
        </div>
    )
}

function PopupFooter({
    closePopup,
    acceptButton,
    extraButton,
}: PopupFooterProps) {
    return (
        <div className={styles.popupFooter}>
            <Button
                onClick={closePopup}
                type={'primary'}
                ghost
            >Закрыть</Button>
            <div className={styles.generalButtons}>
                {extraButton}
                {acceptButton}
            </div>
        </div>
    )
}

function Popup(props: PropsType) {
    const popupRef = useRef<HTMLDivElement|null>(null)

    const withHeader = props.type === 'withHeader' || props.type === 'withHeaderAndFooter'
    const withFooter = props.type === 'withHeaderAndFooter' || props.type === 'withFooter'

    return(
        <div className={styles.popupContainer} ref={popupRef}>
            {withHeader
            && <PopupHeader
                closePopup={props.closePopup}
                headerText={props.headerText}
            />}
            {props.content}
            {withFooter
            && <PopupFooter
                closePopup={props.closePopup}
                extraButton={props.extraButton}
                acceptButton={props.acceptButton}
            />}
        </div>
    )
}

export {
    Popup,
}