import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import Sider from "antd/lib/layout/Sider"
import { Router } from "../../../core/router/router";
import styles from './Sidebar.module.css' 


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
  getItem('Календарь', 'calendar', <CalendarOutlined />),
  getItem('Пользователи', 'users-list', <UserOutlined />),
];

function Sidebar() {
    const onClick: MenuProps['onClick'] = e => {
        switch (e.key) {
            case 'users-list':
                Router.UsersList.open()
                break
            case 'calendar':
                Router.Schedule.open()
                break
        }
      };

    return (
        <Sider className={styles.sider} width={208}>
            <Menu
                onClick={onClick}
                mode="inline"
                items={items}
            />
        </Sider>
    )
}

export {
    Sidebar,
}