#!/bin/sh
[ -d www  ] || mkdir www
[ -d logs ] || mkdir logs
[ -d tmp  ] || mkdir tmp
HTTPD=/usr/sbin/apache2
PORT=8000
SERVER_ROOT=/etc/apache2
MODULES=/usr/lib/apache2/modules
cat <<EOD > httpd.conf
ServerRoot   $SERVER_ROOT
#LockFile     $PWD/logs/httpd.lock
User         $USER
Group        $USER
Listen       $PORT
DocumentRoot $PWD/www/
PidFile      $PWD/logs/httpd.pid
ErrorLog     $PWD/logs/error.log
TypesConfig  /etc/mime.types

# --------------------------------------------------------
# Modules
# --------------------------------------------------------
LoadModule mpm_prefork_module $MODULES/mod_mpm_prefork.so
LoadModule authn_core_module  $MODULES/mod_authn_core.so
LoadModule authz_core_module $MODULES/mod_authz_core.so
LoadModule mime_module $MODULES/mod_mime.so
AddDefaultCharset UTF-8

# --------------------------------------------------------
# PHP
# --------------------------------------------------------
LoadModule  php5_module $MODULES/libphp5.so
AddType     application/x-httpd-php .php
php_value   session.save_path $PWD/tmp
EOD

$HTTPD -f $PWD/httpd.conf

# pause trick
echo "httpd startd on $PORT."
trap "$HTTPD -f $PWD/httpd.conf -k stop" INT
tail -f logs/error.log
