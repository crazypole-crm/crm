<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221122153731 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create base training table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql(<<<SQL
            CREATE TABLE base_training
            (
                id VARCHAR(64) PRIMARY KEY,
                start_date DATETIME NOT NULL,
                end_date DATETIME NOT NULL
                trainer_id VARCHAR(64) NOT NULL,
            );
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
