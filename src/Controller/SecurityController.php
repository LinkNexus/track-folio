<?php

namespace App\Controller;

use App\DTO\UserDTO;
use App\Entity\User;
use App\Event\UserCreatedEvent;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

#[Route("/api", name: "api_", methods: ["POST"])]
final class SecurityController extends AbstractController
{

    #[Route("/register", name: "register", methods: ["POST"])]
    public function register(
        #[MapRequestPayload] UserDTO $userDTO,
        Security                     $security,
        EntityManagerInterface       $entityManager,
        UserPasswordHasherInterface  $userPasswordHasher,
        EventDispatcherInterface     $eventDispatcher
    ): JsonResponse|Response|null
    {
        if ($entityManager->getRepository(User::class)->findOneBy(['email' => $userDTO->email])) {
            return $this->json([
                "violations" => [
                    [
                        "propertyPath" => "email",
                        "title" => "The email {$userDTO->email} is already in use by another account."
                    ]
                ]
            ], Response::HTTP_BAD_REQUEST);
        }

        $user = new User();
        $user->setEmail($userDTO->email);
        $user->setName($userDTO->name);
        $user->setPassword(
            $userPasswordHasher->hashPassword($user, $userDTO->password)
        );

        $entityManager->persist($user);
        $entityManager->flush();

        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $user->getEmail()]);
        $eventDispatcher->dispatch(new UserCreatedEvent($user));

        return $security->login($user, "json_login", "login");
    }

    #[Route("/login", name: "login", methods: ["POST"])]
    public function login()
    {
        throw new \LogicException("This method should never be called directly. It is handled by the security system.");
    }
}
