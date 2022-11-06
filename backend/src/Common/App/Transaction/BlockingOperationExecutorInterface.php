<?php

namespace App\Common\App\Transaction;

interface BlockingOperationExecutorInterface
{
    public function execute(string $name, callable $operation, ...$parameters);
}