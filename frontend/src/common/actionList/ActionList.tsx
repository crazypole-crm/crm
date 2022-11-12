import {StyledComponent} from "../../core/styles/StyledComponent";
import styles from "./ActionList.module.css";
import {joinClassNames} from "../../core/styles/joinClassNames";


type ActionListItemData<T> = {
    id: T,
    text: string,
    disabled?: boolean,
    icon?: JSX.Element,
}

type ActionListProps<T> = StyledComponent<{
    items: ActionListItemData<T>[],
    onClick: (id: T) => void,
}>

type ActionListItemProps<T> = {
    data: ActionListItemData<T>,
    onClick: () => void,
}

function ActionListItem<T>({
    data,
    onClick,
}: ActionListItemProps<T>) {

    const _onClick = (e: any) => {
        console.log('onItemClick')
        e.preventDefault()
        onClick()
    }

    return (
        <div className={(styles.listItem)} onClick={_onClick}>
            {data.icon && <div className={styles.icon}>
                {data.icon}
            </div>}
            <div className={styles.text}>
                {data.text}
            </div>
        </div>
    )
}


function ActionList<T extends string>({
    items,
    onClick,
    className,
}: ActionListProps<T>) {
    return (
        <div className={joinClassNames(styles.list, className)}>
            {items.map(item => {
                return <ActionListItem
                    key={item.id}
                    data={item}
                    onClick={() => onClick(item.id)}
                />
            })}
        </div>
    )
}

export type {
    ActionListItemData,
}

export {
    ActionList,
}