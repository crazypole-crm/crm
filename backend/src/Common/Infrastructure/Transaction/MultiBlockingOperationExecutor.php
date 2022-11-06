<?php
declare(strict_types=1);

namespace App\Common\Infrastructure\Transaction;

use App\Common\App\Transaction\BlockingOperationExecutorInterface;
use App\Common\App\Transaction\MultiBlockingOperationExecutorInterface;

class MultiBlockingOperationExecutor implements MultiBlockingOperationExecutorInterface
{
    /** @var BlockingOperationExecutorInterface */
    private $blockingOperationExecutor;

    public function __construct(BlockingOperationExecutorInterface $blockingOperationExecutor)
    {
        $this->blockingOperationExecutor = $blockingOperationExecutor;
    }

    public function execute(array $names, callable $operation, ...$parameters)
    {
        rsort($names);
        foreach ($names as $name)
        {
            $operation = $this->decorateOperationWithLock($name, $operation);
        }
        return $operation(...$parameters);
    }

    private function decorateOperationWithLock(string $name, callable $operation): callable
    {
        return function (...$parameters) use ($name, $operation)
        {
            return $this->blockingOperationExecutor->execute($name, $operation, ...$parameters);
        };
    }
}