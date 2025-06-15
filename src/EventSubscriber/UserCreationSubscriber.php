<?php

namespace App\EventSubscriber;

use App\Event\UserCreatedEvent;
use App\Security\EmailVerifier;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Mime\Address;

final readonly class UserCreationSubscriber implements EventSubscriberInterface
{
    public function __construct(private EmailVerifier $verifier)
    {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            UserCreatedEvent::class => 'sendRegistrationMail',
        ];
    }

    public function sendRegistrationMail(UserCreatedEvent $event): void
    {
        $user = $event->getUser();
        $this->verifier->sendEmailConfirmation(
            'auth.verify.email',
            $user,
            (new TemplatedEmail())
                ->to(new Address($user->getEmail(), $user->getName()))
                ->subject('Registration confirmation to Track-Folio!')
                ->htmlTemplate('auth/registration_email.html.twig')
        );
    }
}
