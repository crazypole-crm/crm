workspace "Name" "Description" {

    model {
        user = person "Client"
        admin = person "Admin"
        trainer = person "Trainer"
        firebase = softwareSystem "Firebase" "Управляет уведомлениями, получает, отправляет и хранит" {
            tags "OutsideSystem"
        }
        softwareSystem = softwareSystem "CRM - управляет расписанием, пользователями" {
            webapp = container "SPA" {
                user -> this "Использует интерфейс для просмотра расписания и записи на занятия"
                trainer -> this "Использует для создания занятий и отметок посещения учеников"
                admin -> this "Использвует для редактирования расписания или данных пользователей"
            }
            mobileapp = container "MobileApp" {
                user -> this "Использует интерфейс для взаимодействия с приложением для просмотра расписания или записи на занятияя"
                this -> firebase "Достает уведомления"
            }
            api = container "CRM backend" {
                webapp -> this "Использует API для получения данных и выполнения логики"
                mobileapp -> this "Использует API для получения данных и выполнения логики"
                this -> firebase "Отправляет уведомления для мобильного приложения"
            }
            database  = container "MySQL" {
                tags "Database"
                api -> this "Читает и пишет данные по моделям"
            }
            redis  = container "Redis" {
                tags "Database"
                api -> this "Читает и пишет сессии авторизированных пользователей"
            }
            rabbit  = container "RabbitMQ" {
                api -> this "Очередь событий"
            }
        }
    }

    views {
        systemContext softwareSystem {
            include *
            autolayout lr
        }

        container softwareSystem {
            include *
            autolayout lr
        }

        theme default

        styles {
            element "Database" {
                shape cylinder
            }
            element "OutsideSystem" {
                background #808080
            }
        }
    }

}
