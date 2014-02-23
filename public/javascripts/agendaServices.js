var agendaServices = angular.module('agendaServices', ['ngResource']);

agendaServices.factory('Person', ['$resource', function($resource){
    return $resource('api/person/:personId', {}, {
        query: {
            method: 'GET',
            params: {
                personId: 'list'
            },
            isArray: true
        }
    });
}]);