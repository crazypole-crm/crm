<?php
declare(strict_types=1);

namespace App\Training\Domain\Model;

use App\Common\Domain\Uuid;

class Hall
{
    private string $id;
    private string $name;
    private int $capability;

    public function __construct(
        Uuid $id,
        string $name,
        int $capability,
    )
    {
        $this->id = (string)$id;
        $this->name = $name;
        $this->capability = $capability;
    }

    /**
     * @return Uuid
     */
    public function getId(): Uuid
    {
        return new Uuid($this->id);
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

    /**
     * @return int
     */
    public function getCapability(): int
    {
        return $this->capability;
    }

    /**
     * @param int $capability
     */
    public function setCapability(int $capability): void
    {
        $this->capability = $capability;
    }
}