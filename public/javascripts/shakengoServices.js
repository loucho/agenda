var shakengoServices = angular.module('shakengoServices', ['ngResource']);

shakengoServices.factory('JobDescription', ['$resource', function($resource){
    return $resource('api/job-description/:jobDescriptionId', {}, {
        query: {
            method: 'GET',
            params: {
                jobDescriptionId: 'list'
            },
            isArray: true
        }
    });
}]);

shakengoServices.factory('Job', ['$resource', function($resource){
    return $resource('api/job/:jobId', {}, {
        query: {
            method: 'GET',
            params: {
                jobId: 'list'
            },
            isArray: true
        },
        logs: {
            method: 'GET',
            isArray: true, 
            url: 'api/logs/:jobId'
        }
    });
}]);

shakengoServices.factory('Component', ['$resource', function($resource){
    return $resource('api/component/:componentId', {}, {
        query: {
            method: 'GET',
            params: {
                componentId: 'list'
            },
            isArray: true
        }
    });
}]);