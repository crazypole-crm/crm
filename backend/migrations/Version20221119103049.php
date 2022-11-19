<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20221119103049 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create hall table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql(<<<SQL
            CREATE TABLE hall
            (
                id VARCHAR(64) PRIMARY KEY,
                name VARCHAR(256) NOT NULL,
                capability INTEGER NOT NULL,
            );
SQL
        );
    }

    public function down(Schema $schema): void
    {
        $this->addSql(<<<SQL
            DROP TABLE hall;
SQL
        );
    }
}
