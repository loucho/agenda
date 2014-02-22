var shakengo = angular.module('shakengo', ['ngRoute', 'ngAnimate', 'jobDescriptionControllers', 'jobControllers',
        'componentControllers', 'homeControllers', 'shakengoServices', 'jQueryDirectives', 'ui.codemirror',
        'ui.bootstrap', 'chieffancypants.loadingBar']);

shakengo.config(['$routeProvider', 'cfpLoadingBarProvider', function($routeProvider, cfpLoadingBarProvider){
    cfpLoadingBarProvider.includeSpinner = true;
    $routeProvider.when('/home', {
        templateUrl: 'partials/home/index.html',
        controller: 'HomeController'
    }).when('/jobs', {
        templateUrl: 'partials/job/list.html',
        controller: 'JobListController'
    }).when('/job/:jobId', {
        templateUrl: 'partials/job/item.html',
        controller: 'JobItemController'
    }).when('/job-descriptions', {
        templateUrl: 'partials/job-description/list.html',
        controller: 'JobDescriptionListController'
    }).when('/job-description/:jobDescriptionId', {
        templateUrl: 'partials/job-description/item.html',
        controller: 'JobDescriptionItemController'
    }).when('/job-descriptions/new', {
        templateUrl: 'partials/job-description/item.html',
        controller: 'JobDescriptionNewController'
    }).when('/components', {
        templateUrl: 'partials/component/list.html',
        controller: 'ComponentListController'
    }).when('/component/:componentId', {
        templateUrl: 'partials/component/item.html',
        controller: 'ComponentItemController'
    }).when('/components/new', {
        templateUrl: 'partials/component/item.html',
        controller: 'ComponentNewController'
    }).otherwise({
        redirectTo: '/home'
    });
}]);
