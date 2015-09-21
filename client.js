var request = require('request');
var async = require('async');

var worker = function (task, callback) {
    console.log(task);
    request('http://localhost:8000/runner.php/' + task, function (err, response, body) {
        callback();
    });
};
var queue = async.queue(
        worker,
        10
    );

var tasks = [
    'tests/Silex/Tests/Application/FormTraitTest.php',
    'tests/Silex/Tests/Application/MonologTraitTest.php',
    'tests/Silex/Tests/Application/SecurityTraitTest.php',
    'tests/Silex/Tests/Application/SwiftmailerTraitTest.php',
    'tests/Silex/Tests/Application/TranslationTraitTest.php',
    'tests/Silex/Tests/Application/TwigTraitTest.php',
    'tests/Silex/Tests/Application/UrlGeneratorTraitTest.php',
    'tests/Silex/Tests/ApplicationTest.php',
    'tests/Silex/Tests/CallbackResolverTest.php',
    'tests/Silex/Tests/CallbackServicesTest.php',
    'tests/Silex/Tests/ControllerCollectionTest.php',
    'tests/Silex/Tests/ControllerResolverTest.php',
    'tests/Silex/Tests/ControllerTest.php',
    'tests/Silex/Tests/EventListener/LogListenerTest.php',
    'tests/Silex/Tests/ExceptionHandlerTest.php',
    'tests/Silex/Tests/FunctionalTest.php',
    'tests/Silex/Tests/JsonTest.php',
    'tests/Silex/Tests/LazyDispatcherTest.php',
    'tests/Silex/Tests/LazyUrlMatcherTest.php',
    'tests/Silex/Tests/LocaleTest.php',
    'tests/Silex/Tests/MiddlewareTest.php',
    'tests/Silex/Tests/Provider/DoctrineServiceProviderTest.php',
    'tests/Silex/Tests/Provider/FormServiceProviderTest.php',
    'tests/Silex/Tests/Provider/HttpCacheServiceProviderTest.php',
    'tests/Silex/Tests/Provider/HttpFragmentServiceProviderTest.php',
    'tests/Silex/Tests/Provider/MonologServiceProviderTest.php',
    'tests/Silex/Tests/Provider/RememberMeServiceProviderTest.php',
    'tests/Silex/Tests/Provider/SecurityServiceProviderTest.php',
    'tests/Silex/Tests/Provider/SerializerServiceProviderTest.php',
    'tests/Silex/Tests/Provider/SessionServiceProviderTest.php',
    'tests/Silex/Tests/Provider/SwiftmailerServiceProviderTest.php',
    'tests/Silex/Tests/Provider/TranslationServiceProviderTest.php',
    'tests/Silex/Tests/Provider/TwigServiceProviderTest.php',
    'tests/Silex/Tests/Provider/UrlGeneratorServiceProviderTest.php',
    'tests/Silex/Tests/Provider/ValidatorServiceProviderTest.php',
    'tests/Silex/Tests/Route/SecurityTraitTest.php',
    'tests/Silex/Tests/RouterTest.php',
    'tests/Silex/Tests/ServiceControllerResolverRouterTest.php',
    'tests/Silex/Tests/ServiceControllerResolverTest.php',
    'tests/Silex/Tests/StreamTest.php',
    'tests/Silex/Tests/WebTestCaseTest.php',
];
queue.push(tasks);
