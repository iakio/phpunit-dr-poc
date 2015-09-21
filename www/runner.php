<?php
require __DIR__ . '/../vendor/autoload.php';

$base = '../../Silex';
$file = $_SERVER['PATH_INFO'];
$command = new PHPUnit_TextUI_Command;
$command->run([
    'phpunit',
    '-c',
    "$base/phpunit.xml.dist",
    $base.$file,
], false);
