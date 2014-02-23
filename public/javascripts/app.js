var agenda = angular.module('agenda', ['ngRoute', 'ngAnimate', 'personControllers', 'homeControllers', 'agendaServices', 'chieffancypants.loadingBar']);

agenda.config(['$routeProvider', 'cfpLoadingBarProvider', function($routeProvider, cfpLoadingBarProvider){
    cfpLoadingBarProvider.includeSpinner = true;
    $routeProvider.when('/home', {
        templateUrl: 'partials/home/index.html',
        controller: 'HomeController'
    }).when('/persons', {
        templateUrl: 'partials/person/list.html',
        controller: 'PersonListController'
    }).when('/person/:personId', {
        templateUrl: 'partials/person/item.html',
        controller: 'PersonItemController'
    }).when('/persons/new', {
        templateUrl: 'partials/person/item.html',
        controller: 'PersonNewController'
    }).otherwise({
        redirectTo: '/home'
    });
}]);
