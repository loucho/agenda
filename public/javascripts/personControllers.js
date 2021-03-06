var personControllers = angular.module('personControllers', []);

// Managing the person list
personControllers.controller('PersonListController', ['$scope', 'Person', '$location', '$dialogs', function($scope, Person, $location, $dialogs){
    $scope.persons = Person.query();

    $scope.deletePerson = function(person){

        var dlg = $dialogs.confirm('Estas seguro?','Esto eliminara todos los datos de la persona, esta accion no es revertible');
        dlg.result.then(function(btn){
            Person.delete({personId: person._id}, function(){
            	var i = $scope.persons.indexOf(person);
                $scope.persons.splice(i, 1);
            }); 
        },function(btn){
                ;
        }); 
    };
    $scope.editPerson = function(person){
        $location.path('person/' + person._id);    
    };
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
                $scope.person.emails.push({value:""});
            };

            $scope.deletePhone = function(phone){
                var i = $scope.person.phones.indexOf(phone);
                $scope.person.phones.splice(i, 1);
            };

            $scope.addPhone = function(){
                $scope.person.phones.push({value:""});
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
                emails: [{value:""}],
                phones: [{value:""}],
                isESTUNAM: false    
            };

            $scope.deleteEmail = function(email){
                var i = $scope.person.emails.indexOf(email);
                $scope.person.emails.splice(i, 1);
            };

            $scope.addEmail = function(){
                $scope.person.emails.push({value:""});
            };

            $scope.deletePhone = function(phone){
                var i = $scope.person.phones.indexOf(phone);
                $scope.person.phones.splice(i, 1);
            };

            $scope.addPhone = function(){
                $scope.person.phones.push({value:""});
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