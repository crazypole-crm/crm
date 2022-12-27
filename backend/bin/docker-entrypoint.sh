#!/bin/bash

bin/console doctrine:migrations:migrate --no-interaction --allow-no-migration
docker-php-entrypoint
php-fpm