import { Checkbox } from "antd"
import { joinClassNames } from "../../core/styles/joinClassNames"
import { StyledComponent } from "../../core/styles/StyledComponent"
import styles from './SelectList.module.css'

type SelectListItemData<T> = {
    id: T,
    text: string,
    checked: boolean,
    disabled: boolean,
}

type SelectListProps<T> = StyledComponent<{
    items: SelectListItemData<T>[],
    onCheckedChanged: (id: T, value: boolean) => void,
}>

type SelectListItemProps<T> = {
    data: SelectListItemData<T>,
    onClick: (checked: boolean) => void,
}

function SelectListItem<T>({
    data,
    onClick,
}: SelectListItemProps<T>) {

    return (
        <div className={(styles.listItem)}>
            <Checkbox
                checked={data.checked}
                onClick={() => onClick(!data.checked)}
                className={styles.checkbox}
                disabled={data.disabled}
            />
            <div
                className={data.disabled ? styles.is_disabled : styles.text}
                onClick={() => onClick(!data.checked)}
            >
                {data.text}
            </div>
        </div>
    )
}


function SelectList<T>({
    items,
    onCheckedChanged,
    className,
}: SelectListProps<T>) {
    return (
        <div className={joinClassNames(styles.list, className)}>
            {items.map(item => {
                return <SelectListItem
                    key={item.id as string}
                    data={item}
                    onClick={checked => onCheckedChanged(item.id, checked)}
                />
            })}
        </div>
    )
}

export type {
    SelectListItemData,
}

export {
    SelectList,
}