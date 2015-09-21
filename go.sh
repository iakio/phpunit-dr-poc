#!/bin/sh
[ -d www  ] || mkdir www
[ -d logs ] || mkdir logs
[ -d tmp  ] || mkdir tmp
HTTPD=/usr/sbin/httpd
PORT=8000
cat <<EOD > httpd.conf
ServerRoot   /etc/httpd
LockFile     $PWD/logs/httpd.lock
Listen       $PORT
DocumentRoot $PWD/www/
PidFile      $PWD/logs/httpd.pid
ErrorLog     $PWD/logs/error.log
TypesConfig  /etc/mime.types

# --------------------------------------------------------
# Modules
# --------------------------------------------------------
LoadModule mime_module modules/mod_mime.so
AddDefaultCharset UTF-8

# --------------------------------------------------------
# PHP
# --------------------------------------------------------
LoadModule  php5_module modules/libphp5.so
AddType     application/x-httpd-php .php
php_value   session.save_path $PWD/tmp
EOD

$HTTPD -f $PWD/httpd.conf

# pause trick
echo "httpd startd on $PORT."
echo "Hit Ctrl-D to stop httpd."
trap "" 2
cat > /dev/null
$HTTPD -f $PWD/httpd.conf -k stop
echo "stop"
