<?php

namespace App\Common\App\Transaction;

interface MultiBlockingOperationExecutorInterface
{
    public function execute(array $names, callable $operation, ...$parameters);
}