<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20221119103808 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create training table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql(<<<SQL
            CREATE TABLE training
            (
                id VARCHAR(64) PRIMARY KEY,
                name VARCHAR(256) NOT NULL,
                description VARCHAR(256),
                start_date DATETIME NOT NULL,
                end_date DATETIME NOT NULL,
                course_id VARCHAR(64) NOT NULL,
                hall_id VARCHAR(64) NOT NULL,
                trainer_id VARCHAR(64) NOT NULL
            );
SQL
        );
    }

    public function down(Schema $schema): void
    {
        $this->addSql(<<<SQL
            DROP TABLE training;
SQL
        );
    }
}
