<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221216092433 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        $this->addSql(<<<SQL
            CREATE TABLE `training_registration`
            (
                id VARCHAR(64) PRIMARY KEY,
                training_id VARCHAR(64) NOT NULL,
                user_id VARCHAR(64) NOT NULL,
                status TINYINT NOT NULL DEFAULT 0
            );
SQL
        );
    }

    public function down(Schema $schema): void
    {
        $this->addSql(<<<SQL
            DROP TABLE `training_registration`;
SQL
        );
    }
}
