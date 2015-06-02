import app from '../app';

app.controller("HelloController", ['$scope', '$templateCache', function($scope, $templateCache) {
	$scope.name = "Calvin Hobbes";

  window.blah = $templateCache;
	console.log($templateCache.get('template1.html'));
	$scope.templateName = 'template1.html';
}]);

// angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("template1.html","FOOOOOO\n");
// $templateCache.put("foo/template1.html","FOOOOOO\n");}]);

//
// app.run(['$templateCache',
//   function($templateCache) {
//     $templateCache.put("template1.html", "DERP DERP");
//   }
// ]);