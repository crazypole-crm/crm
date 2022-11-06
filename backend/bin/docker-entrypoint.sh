#!/bin/bash

bin/console doctrine:migrations:migrate
docker-php-entrypoint
php-fpm