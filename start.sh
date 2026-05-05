#!/bin/bash
set -e

# Point Apache at the right port
sed -i "s/Listen 80/Listen ${PORT:-10000}/" /etc/apache2/ports.conf

# Laravel bootstrap
php artisan config:cache
php artisan route:cache
php artisan migrate --force

apache2-foreground
