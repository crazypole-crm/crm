<?php
declare(strict_types=1);

namespace App\Common\Infrastructure\Transaction;

use App\Common\App\Transaction\TransactionInterface;
use Doctrine\ORM\EntityManagerInterface;

class Transaction implements TransactionInterface
{
    public const COMMITTED_EVENT_NAME = 'transactionCommitted';
    /** @var EntityManagerInterface */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * @inheritdoc
     * @throws \Throwable
     */
    public function execute(?callable $callback = null)
    {
        // By using transactional we prevent auto-committing nesting DBAL operations if they are present (in most cases they are not).
        // e.g. update some data using Doctrine Query class, bypassing update via Entity.
        // flush() method call is encapsulated within this method so we don't have to call it explicitly.
        //
        // More: https://www.doctrine-project.org/projects/doctrine-orm/en/2.6/reference/transactions-and-concurrency.html#approach-2-explicitly
        $callback = $callback ?: function (): void
        {
            // We have to define such function because transactional() throws exception in case of empty args were passed.
            // Remove this comment if some actions will appear.
        };
        // Need for continue import users after exception.
        // Clear for avoid partial user changes.
        return $this->transactionalClearIfCallbackThrows($callback);
    }

    /**
     * @param callable $callback
     * @throws \Doctrine\DBAL\ConnectionException
     * @throws \Throwable
     */
    private function transactionalClearIfCallbackThrows(callable $callback)
    {
        $em = $this->em;
        $conn = $em->getConnection();
        $closeEm = false;
        $conn->beginTransaction();
        try
        {
            $result = $callback();
            $closeEm = true;
            $em->flush();
            $conn->commit();
        }
        catch (\Throwable $e)
        {
            if ($closeEm)
            {
                $em->close();
            }
            else
            {
                $em->clear();
            }
            $conn->rollBack();
            throw $e;
        }
        if ($conn->getTransactionNestingLevel() === 0)
        {
            $em->getEventManager()->dispatchEvent(self::COMMITTED_EVENT_NAME);
        }
        return $result;
    }
}