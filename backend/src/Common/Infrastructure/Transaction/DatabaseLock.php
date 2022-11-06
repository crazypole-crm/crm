<?php
declare(strict_types=1);

namespace App\Common\Infrastructure\Transaction;

use Doctrine\DBAL\Connection;

class DatabaseLock
{
    // MySQL 5.7 and later limits lock name length to 64 characters.
    // We limit lock id to 48 characters:
    //   64 - strlen('isonline_123456.') = 48
    private const LOCK_ID_MAX_LENGTH = 48;
    private const MD5_HEX_LENGTH = 32;
    private const LOCK_PREFIX_LENGTH = self::LOCK_ID_MAX_LENGTH - self::MD5_HEX_LENGTH;

    /** @var string */
    private $id;
    /** @var Connection */
    private $connection;
    /** @var int */
    private $timeOut;

    public function __construct(Connection $connection, string $id, int $timeOut = 5)
    {
        $this->connection = $connection;
        $this->id = $id;
        $this->timeOut = $timeOut;
    }

    public function acquire(): void
    {
        $this->acquireImpl(self::makeShortLockId($this->id));
    }

    public function release(): void
    {
        $this->releaseImpl(self::makeShortLockId($this->id));
    }

    /**
     * @param string $sql
     * @param array $params
     * @param string $error
     */
    private function executeQuery(string $sql, array $params, string $error): void
    {
        $res = $this->connection->executeQuery($sql, $params)->fetchOne();
        if ($res !== 1)
        {
            throw new \RuntimeException($error);
        }
    }

    private function acquireImpl(string $id): void
    {
        $this->executeQuery(
            'SELECT GET_LOCK(SUBSTRING(CONCAT(DATABASE(), \'.\', :id), 1, 64), :timeOut)',
            [
                'id' => $id,
                'timeOut' => $this->timeOut,
            ],
            "lock $id"
        );
    }

    private function releaseImpl(string $id): void
    {
        $this->executeQuery(
            'SELECT RELEASE_LOCK(SUBSTRING(CONCAT(DATABASE(), \'.\', :id), 1, 64))',
            [
                'id' => $id,
            ],
            "unlock $id"
        );
    }

    private static function makeShortLockId(string $lockId): string
    {
        if (strlen($lockId) > self::LOCK_PREFIX_LENGTH)
        {
            $prefix = substr($lockId, 0, self::LOCK_PREFIX_LENGTH);
            $suffix = substr($lockId, self::LOCK_PREFIX_LENGTH);
            return $prefix . md5($suffix);
        }
        return $lockId;
    }
}