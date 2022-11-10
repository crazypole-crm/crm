import React, {FC} from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {ItemData} from "../../../viewModel/filterPanel/ItemData";
import {FilterData} from "../../../viewModel/filterPanel/FilterData";

type MenuItem = Required<MenuProps>['items'][number];

type FiltersPanelProps = {
    filterList: FilterData[],
    selectedFilters: string[],
    onFiltersChange: (selectedFilters: string[]) => void
}


function getItem(key: React.Key, label: React.ReactNode, children?: MenuItem[]): MenuItem {
    return {key, label, children};
}

function getItemsDataFromArray(array: ItemData[]) : MenuItem[] {
    return array.map(option => getItem(option.id, option.name))
}

function getMenuItemsFromArray(array: FilterData[]) : MenuItem[] {
    return array.map(element => getItem(element.id, element.name, getItemsDataFromArray(element.items)))
}

const FilterPanel: FC<FiltersPanelProps> = ({
    filterList ,
    onFiltersChange,
    selectedFilters,
}) => {

    const items: MenuProps['items'] = getMenuItemsFromArray(filterList);

    const onSelect: MenuProps['onSelect'] = e => {
        onFiltersChange(e.selectedKeys);
    };

    const onDeselect: MenuProps['onDeselect'] = e => {
        onFiltersChange(e.selectedKeys);
    };

    return (
        <Menu
            onSelect={onSelect}
            onDeselect={onDeselect}
            style={{
                width: 300,
                borderRadius: 5,
                filter: 'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.15))',
            }}
            selectedKeys={selectedFilters}
            defaultOpenKeys={[]}
            mode="inline"
            multiple
            items={items}
        />
    );
};

export default FilterPanel;