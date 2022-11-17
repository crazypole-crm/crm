<?php
declare(strict_types=1);

namespace App\Event\Domain\Model;

use App\Common\Domain\Uuid;

class Hall
{
    public function __construct(
        private Uuid $id,
        private string $name,
        private int $capability,
    ){}

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