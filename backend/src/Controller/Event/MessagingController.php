<?php
declare(strict_types=1);

namespace App\Controller\Event;

use App\Common\Domain\Event\EventInterface;
use App\Common\Domain\Event\MessageDispatcherInterface;
use App\Common\Security\SecurityContextInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\Envelope;
use Symfony\Component\Messenger\Transport\Serialization\SerializerInterface;
use Symfony\Component\Routing\Annotation\Route;

class MessagingController extends AbstractController
{
    private MessageDispatcherInterface $messageDispatcher;
    private SecurityContextInterface $securityContext;
    private SerializerInterface $serializer;

    public function __construct(SecurityContextInterface $securityContext, MessageDispatcherInterface $messageDispatcher, SerializerInterface $serializer)
    {
        $this->messageDispatcher = $messageDispatcher;
        $this->securityContext = $securityContext;
        $this->serializer = $serializer;
    }

    /**
     * @Route("/dispatchevent")
     */
    public function dispatch(Request $request): Response
    {
        /** @var Envelope $envelope */
        $envelope = unserialize(stripslashes($request->getContent()));
        $event = $envelope->getMessage();
        if (!$event instanceof EventInterface)
        {
            throw new \RuntimeException('Invalid message type');
        }
        $this->messageDispatcher->dispatch($event);
        return new Response('', Response::HTTP_NO_CONTENT);
    }
}