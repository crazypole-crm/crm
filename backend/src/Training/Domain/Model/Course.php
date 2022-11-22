<?php
declare(strict_types=1);

namespace App\Training\Domain\Model;

use App\Common\Domain\Uuid;

class Course
{
    private Uuid $id;
    private string $name;

    public function __construct(
        Uuid $id,
        string $name,
    )
    {
        $this->id = $id;
        $this->name = $name;
    }

    /**
     * @return Uuid
     */
    public function getId(): Uuid
    {
        return $this->id;
    }

    /**
     * @param Uuid $id
     */
    public function setId(Uuid $id): void
    {
        $this->id = $id;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }
}