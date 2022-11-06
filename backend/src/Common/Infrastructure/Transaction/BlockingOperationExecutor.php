<?php
declare(strict_types=1);

namespace App\Common\Infrastructure\Transaction;

use App\Common\App\Transaction\BlockingOperationExecutorInterface;
use Doctrine\DBAL\Connection;

class BlockingOperationExecutor implements BlockingOperationExecutorInterface
{
    /** @var Connection */
    private $connection;

    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
    }

    /**
     * @param string $name
     * @param callable $operation
     * @param mixed ...$parameters
     * @return mixed
     */
    public function execute(string $name, callable $operation, ...$parameters)
    {
        $lock = new DatabaseLock($this->connection, $name);
        $lock->acquire();
        try
        {
            return call_user_func($operation, ...$parameters);
        }
        finally
        {
            $lock->release();
        }
    }
}