FROM php:fpm

RUN docker-php-ext-install pdo_mysql
RUN pecl install apcu
RUN pecl install redis && docker-php-ext-enable redis

RUN apt-get update && \
apt-get install -y \
libzip-dev

RUN docker-php-ext-install zip
RUN docker-php-ext-enable apcu

WORKDIR /usr/src/backend

COPY --chown=1000:1000 backend /usr/src/backend

RUN PATH=$PATH:/usr/src/backend/vendor/bin:bin

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
RUN composer install --no-scripts --prefer-dist --no-interaction
RUN chmod +x ./bin/docker-entrypoint.sh

ENTRYPOINT ["./bin/docker-entrypoint.sh"]
