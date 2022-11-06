<?php

namespace App\Common\App\Transaction;

interface TransactionInterface
{
    public function execute(?callable $callback = null);
}