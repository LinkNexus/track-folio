<?php

namespace App\Controller;

use App\Entity\User;
use App\Security\EmailVerifier;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Mime\Address;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

#[Route("/api", name: "api_", methods: ["POST"])]
final class SecurityController extends AbstractController
{

    #[Route("/register", name: "register", methods: ["POST"])]
    public function register(
        #[MapRequestPayload] User   $user,
        Security                    $security,
        EntityManagerInterface      $entityManager,
        UserPasswordHasherInterface $userPasswordHasher,
        EmailVerifier               $emailVerifier
    )
    {
        $user->setPassword(
            $userPasswordHasher->hashPassword($user, $user->getPassword())
        );

        try {
            $entityManager->persist($user);
            $entityManager->flush();

            $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $user->getEmail()]);

            $emailVerifier->sendEmailConfirmation("auth.verify_email", $user, (new TemplatedEmail)
                ->to(new Address($user->getEmail(), $user->getName()))
                ->subject("Registration Confirmation to Track-Folio!")
                ->htmlTemplate("auth/registration_email.html.twig")
            );

            return $security->login($user, "json_login", "login");
        } catch (\Doctrine\DBAL\Exception $e) {
            return $this->json([
                'message' => 'User already exists',
            ], 400);

        } catch (\Exception $e) {
            return $this->json([
                'message' => 'An error occurred while registering the user',
            ], 500);
        }
    }
}
