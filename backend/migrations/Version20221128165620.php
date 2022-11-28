<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20221128165620 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add training fields to base_training';
    }

    public function up(Schema $schema): void
    {
        $this->addSql(<<<SQL
            ALTER TABLE base_training
                ADD COLUMN course_id VARCHAR(64) NOT NULL,
                ADD COLUMN hall_id VARCHAR(64) NOT NULL,
                ADD COLUMN type TINYINT NOT NULL
SQL
        );
    }

    public function down(Schema $schema): void
    {
        $this->addSql(<<<SQL
            DROP TABLE base_training;
SQL
        );
    }
}
