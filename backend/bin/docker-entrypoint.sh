#!/bin/sh

bin/console doctrine:migrations:migrate
docker-php-entrypoint
php-fpm