import {useAtomWithSelector} from "../../../core/reatom/useAtomWithSelector";
import {useAction} from "@reatom/react";
import {Input, Modal, Select} from "antd";
import React from "react";
import {
    sendCustomNotificationPopupActions,
    sendCustomNotificationPopupAtom
} from "../../viewModel/calendar/sendCustomNotification/sendCustomNotification";
import {FieldBlock} from "../schedule/calendar/common/FieldBlock";
import {userRoles} from "../../viewModel/users/UserData";
import {mapRoleTypeToText} from "../users/table/cells/UserRoleCell";
import TextArea from "antd/lib/input/TextArea";


function RoleField() {
    const consumersRole = useAtomWithSelector(sendCustomNotificationPopupAtom, x => x.consumersRole)
    const handleSetConsumersRole = useAction(sendCustomNotificationPopupActions.setConsumersRole)

    return (
        <Select
            value={consumersRole}
            onChange={handleSetConsumersRole}
            options={[
                {
                    value: userRoles[1],
                    label: mapRoleTypeToText(userRoles[1]),
                },
                {
                    value: userRoles[2],
                    label: mapRoleTypeToText(userRoles[2]),
                },
            ]}
            placeholder={'Выберите роль'}
            style={{
                width: 200,
            }}
        />
    )
}

function TitleField() {
    const title = useAtomWithSelector(sendCustomNotificationPopupAtom, x => x.title)
    const handleSetTitle = useAction(sendCustomNotificationPopupActions.setTitle)

    return <Input
        placeholder="Заголовок"
        value={title}
        onChange={e => handleSetTitle(e.target.value)}
    />
}

function BodyField() {
    const body = useAtomWithSelector(sendCustomNotificationPopupAtom, x => x.body)
    const handleSetBody = useAction(sendCustomNotificationPopupActions.setBody)

    return <TextArea
        value={body}
        placeholder="Текст уведомления"
        onChange={e => handleSetBody(e.target.value)}
        autoSize={{ minRows: 3, maxRows: 5 }}
    />
}

function Content() {
    const titleError = useAtomWithSelector(sendCustomNotificationPopupAtom, x => x.titleError)
    const bodyError = useAtomWithSelector(sendCustomNotificationPopupAtom, x => x.bodyError)
    const roleError = useAtomWithSelector(sendCustomNotificationPopupAtom, x => x.roleError)

    return (
        <div>
            <FieldBlock
                title={'Для кого'}
                content={<RoleField />}
                error={!!roleError}
            />
            <FieldBlock
                title={'Заголовок'}
                content={<TitleField />}
                error={!!titleError}
            />
            <FieldBlock
                title={'Текст уведомления'}
                content={<BodyField />}
                error={!!bodyError}
            />
        </div>
    )
}

function SendCustomNotificationPopup() {
    const sendCustomNotificationPopupOpened = useAtomWithSelector(sendCustomNotificationPopupAtom, x => x.opened)
    const submitButtonLoading = useAtomWithSelector(sendCustomNotificationPopupAtom, x => x.submitButtonLoading)
    const handleCloseSendCustomNotificationPopup = useAction(sendCustomNotificationPopupActions.close)
    const handleSubmitSendCustomNotificationPopup = useAction(sendCustomNotificationPopupActions.submit)

    return <Modal
        title={'Отправить уведомление'}
        open={sendCustomNotificationPopupOpened}
        centered
        okText={'Отправить'}
        cancelText={'Отмена'}
        onCancel={handleCloseSendCustomNotificationPopup}
        okButtonProps={{
            onClick: handleSubmitSendCustomNotificationPopup,
            loading: submitButtonLoading,
            type: 'primary',
        }}
    >
        <Content/>
    </Modal>
}

export {
    SendCustomNotificationPopup,
}