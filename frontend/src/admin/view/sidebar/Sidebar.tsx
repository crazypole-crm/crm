import {CalendarOutlined, MenuFoldOutlined, NodeIndexOutlined, TeamOutlined} from "@ant-design/icons";
import {Menu, MenuProps} from "antd";
import {useState} from "react";
import {useLocation} from "react-router-dom";
import {Router} from "../../../core/router/router";
import styles from './Sidebar.module.css'
import {getStylesWithMods} from "../../../core/styles/getStylesWithMods";


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Календарь', 'calendar', <CalendarOutlined/>),
    getItem('Пользователи', 'users-list', <TeamOutlined/>),
    getItem('Направления', 'directions-list', <NodeIndexOutlined />),
];

function getDefaultSelectedSection(path: string): string {
    switch (path) {
        case Router.Schedule.url():
            return 'calendar'
        case Router.UsersList.url():
            return 'users-list'
        case Router.Directions.url():
            return 'directions-list'
    }
    return ''
}

type CollapsedBlockProps = {
    collapsed: boolean,
    onCollapseButtonClick: () => void,
}

function CollapsedBlock({
    collapsed,
    onCollapseButtonClick,
}: CollapsedBlockProps) {
    return (
        <div
            className={getStylesWithMods(styles.collapsedBlock, {
                [styles.collapsedSider]: collapsed,
            })}
             onClick={onCollapseButtonClick}
        >
            <div className={styles.collapseButton}>
                <MenuFoldOutlined />
            </div>
        </div>
    )
}

function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation()

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const onClick: MenuProps['onClick'] = e => {
        switch (e.key) {
            case 'users-list':
                Router.UsersList.open()
                break
            case 'calendar':
                Router.Schedule.open()
                break
            case 'directions-list':
                Router.Directions.open()
                break
        }
    };

    const className = getStylesWithMods(styles.sider, {
        [styles.expandedSider]: !collapsed,
    })

    return (
        <div
            className={className}
        >
            <Menu
                onClick={onClick}
                mode="inline"
                items={items}
                defaultSelectedKeys={[getDefaultSelectedSection(location.pathname)]}
                inlineCollapsed={collapsed}
                className={styles.menu}
            />
            <CollapsedBlock onCollapseButtonClick={toggleCollapsed} collapsed={collapsed} />
        </div>
    )
}

export {
    Sidebar,
}