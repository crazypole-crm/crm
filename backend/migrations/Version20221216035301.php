<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221216035301 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add max registrations to training';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE `training` ADD COLUMN `max_registrations` INT NOT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE `training` DROP COLUMN `max_registrations`');
    }
}
