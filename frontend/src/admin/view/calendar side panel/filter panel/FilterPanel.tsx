import React, {FC} from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {ItemData} from "../../../viewModel/filterPanel/ItemData";
import {FilterData} from "../../../viewModel/filterPanel/FilterData";

type MenuItem = Required<MenuProps>['items'][number];

type FiltersPanelProps = {
    filterList: FilterData[],
    onFilterPanelChange: (selectedFilters: string[]) => void
}


function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'): MenuItem
{
    return {key, icon, children, label, type} as MenuItem;
}

function GetMenuItemsFromArray(array: FilterData[]) : MenuItem[] {
    return array.map(element => getItem(element.id, element.id, element.icon, GetItemsDataFromArray(element.items)))
}

function GetItemsDataFromArray(array: ItemData[]) : MenuItem[] {
    return array.map(option => getItem(option.id, option.id, null))
}

const FilterPanel: FC<FiltersPanelProps> = ({filterList , onFilterPanelChange}) => {

    const items: MenuProps['items'] = GetMenuItemsFromArray(filterList);

    const onClick: MenuProps['onClick'] = e => {
        // console.log('click ', e);
        // console.log('click ', e.item);
    };

    const onSelect: MenuProps['onSelect'] = e => {
        onFilterPanelChange(e.selectedKeys);
    };

    const onDeselect: MenuProps['onDeselect'] = e => {
        onFilterPanelChange(e.selectedKeys);
    };

    return (
        <Menu
            onClick={onClick}
            onSelect={onSelect}
            onDeselect={onDeselect}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            multiple
            items={items}
        />
    );
};

export default FilterPanel;