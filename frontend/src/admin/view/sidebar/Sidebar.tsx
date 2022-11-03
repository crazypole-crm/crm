import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import Sider from "antd/lib/layout/Sider"
import { useLocation } from "react-router-dom";
import { Router } from "../../../core/router/router";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "../LayoutBlocksSize";
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
  getItem('Главная', 'dashboard'),
  getItem('Календарь', 'calendar', <CalendarOutlined />),
  getItem('Пользователи', 'users-list', <UserOutlined />),
];

function getDefaultSelectedSection(path: string): string {
  switch (path) {
    case Router.Dashboard.url():
      return 'dashboard'
    case Router.Schedule.url():
      return 'calendar'
    case Router.UsersList.url():
      return 'users-list'
  }
  return ''
}

function Sidebar() {
  const location = useLocation()

  const onClick: MenuProps['onClick'] = e => {
    switch (e.key) {
        case 'dashboard':
          Router.Dashboard.open()
          break
        case 'users-list':
          Router.UsersList.open()
          break
        case 'calendar':
        Router.Schedule.open()
          break
    }
  };

    return (
        <Sider
          className={styles.sider}
          width={SIDEBAR_WIDTH}
          style={{
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
            top: HEADER_HEIGHT,
          }}
        >
            <Menu
                onClick={onClick}
                mode="inline"
                items={items}
                defaultSelectedKeys={[getDefaultSelectedSection(location.pathname)]}
            />
        </Sider>
    )
}

export {
    Sidebar,
}