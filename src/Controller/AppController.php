<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class AppController extends AbstractController
{
    #[Route('/{req}', name: 'catch_all', requirements: ['req' => '.*'], priority: -5)]
    public function index(): Response
    {
        return $this->render("index.html.twig");
    }
}
