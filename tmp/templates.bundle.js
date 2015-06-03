angular.module("helloApp").run(["$templateCache", function($templateCache) {$templateCache.put("template1.html","Contents of template1.html");
$templateCache.put("foo/template1.html","FOOOOOO\n");}]);