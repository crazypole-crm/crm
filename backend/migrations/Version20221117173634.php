<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221117173634 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Alter user fields';
    }

    public function up(Schema $schema): void
    {
        $this->addSql(<<<SQL
            ALTER TABLE user
                MODIFY birthday VARCHAR(128),
                MODIFY last_visit VARCHAR(128)
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
