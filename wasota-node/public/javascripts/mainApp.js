var main = angular.module('main', ["ngRoute", "ngTable"]);

main.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.

      when('/home', {
        templateUrl: '/partial/home',
        controller: 'homeCtrl'
      }).
      when('/add', {
        templateUrl: '/partial/add',
        controller: 'addCtrl'
      }).
      when('/search', {
        templateUrl: '/partial/search',
        controller: 'searchCtrl'
      }).
	   when('/login', {
        templateUrl: '/partial/login',
        controller: 'loginCtrl'
      }).
	   when('/register', {
        templateUrl: '/partial/register',
        controller: 'registerCtrl'
      }).
      when('/wiki', {
        templateUrl: '/partial/wiki',
        controller: 'wikiCtrl'
      }).
	   when('/admin', {
        templateUrl: '/partial/admin/area',
        controller: 'adminCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]
  );


main.factory('generalData', function () {
  var serverURL = 'http://localhost:8080/';

  return {
    appName: 'WASOTA',
    serverURL: serverURL,
    proxyUrl: "/partial/proxy" + "?serverURL=" + serverURL,

  };
});
