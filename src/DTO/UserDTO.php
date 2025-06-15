<?php

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class UserDTO
{

    public ?int $id;

    #[Assert\NotBlank(message: "Please enter an email address.")]
    #[Assert\Email(message: "The email '{{ value }}' is not a valid email address.")]
    public ?string $email;

    #[Assert\Length(min: 2, max: 255, minMessage: "The name must be at least {{ limit }} characters long", maxMessage: "The name cannot be longer than {{ limit }} characters")]
    #[Assert\Regex(pattern: '/^[\w -]+$/', message: "The name can only contain letters, numbers, dashes and underscores.")]
    public ?string $name;

    #[Assert\NotCompromisedPassword]
    #[Assert\PasswordStrength]
    public ?string $password;

    #[Assert\EqualTo(propertyPath: "password", message: "The passwords do not match.")]
    public ?string $confirmPassword;
}
