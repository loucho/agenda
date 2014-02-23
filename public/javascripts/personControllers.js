var personControllers = angular.module('personControllers', []);

// Managing the person list
personControllers.controller('PersonListController', ['$scope', 'Person', function($scope, Person){
    $scope.persons = Person.query();
}]);

// viewing individual persons
personControllers.controller('PersonItemController', ['$scope', '$routeParams', 'Person', '$location',
        function($scope, $routeParams, Person, $location){
            $scope.person = Person.get({
                personId: $routeParams.personId
            });

            $scope.deleteEmail = function(email){
                var i = $scope.person.emails.indexOf(email);
                $scope.person.emails.splice(i, 1);
            };

            $scope.addEmail = function(){
                $scope.person.emails.push("");
            };

            $scope.deletePhone = function(phone){
                var i = $scope.person.phones.indexOf(phone);
                $scope.person.phones.splice(i, 1);
            };

            $scope.addPhone = function(){
                $scope.person.phones.push("");
            };

            $scope.savePerson = function(){
                var person = $scope.person;
                var newPerson = new Person(person);
                newPerson.$save(function(p, resp){
                    if(!p.error){
                        $location.path('persons');
                    } else{
                        alert('Could not update Person');
                    }
                });
            };
        }]);

// Creating a new Person
personControllers.controller('PersonNewController', ['$scope', 'Person', '$location',
        function JobDescriptionNewController($scope, Person, $location){
            $scope.person = {
                name: "",
                last_name: "",
                second_last_name: "",
                created: "",
                emails: [],
                phones: []
            };

            $scope.deleteEmail = function(email){
                var i = $scope.person.emails.indexOf(email);
                $scope.person.emails.splice(i, 1);
            };

            $scope.addEmail = function(){
                $scope.person.emails.push("");
            };

            $scope.deletePhone = function(phone){
                var i = $scope.person.phones.indexOf(phone);
                $scope.person.phones.splice(i, 1);
            };

            $scope.addPhone = function(){
                $scope.person.phones.push("");
            };

            $scope.savePerson = function(){
                var person = $scope.person;
                var newPerson = new Person(person);
                newPerson.$save(function(p, resp){
                    if(!p.error){
                        $location.path('persons');
                    } else{
                        alert('Could not create Person');
                    }
                });
            };
        }]);