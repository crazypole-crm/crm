<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221122152347 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Training user fields';
    }

    public function up(Schema $schema): void
    {
        $this->addSql(<<<SQL
            ALTER TABLE training
                ADD COLUMN base_id VARCHAR(64) NOT NULL,
                ADD COLUMN is_canceled TINYINT DEFAULT 0
SQL
        );
    }

    public function down(Schema $schema): void
    {
        $this->addSql(<<<SQL
            DROP TABLE user;
SQL
        );
    }
}
