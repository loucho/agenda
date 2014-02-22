var componentControllers = angular.module('componentControllers', []);

// Managing the component list
componentControllers.controller('ComponentListController', ['$scope', 'Component', function($scope, Component){
    $scope.components = Component.query();

    $scope.query = {};
    $scope.query.type = "";

    $scope.types = [{
        code: "",
        name: "All"
    }, {
        code: 1,
        name: 'Source'
    }, {
        code: 2,
        name: 'Shaker'
    }, {
        code: 3,
        name: 'Target'
    }];

    $scope.getType = function(type){
        typeObj = _.findWhere($scope.types, {
            code: type
        });
        return typeObj.name;
    };
}]);

// viewing individual components
componentControllers.controller('ComponentItemController', ['$scope', '$routeParams', 'Component', '$location',
        function($scope, $routeParams, Component, $location){
            $scope.component = Component.get({
                componentId: $routeParams.componentId
            });

            $scope.editorOptions = {
                lineWrapping: true,
                lineNumbers: true,
                mode: 'text/javascript'
            };

            $scope.componentTypes = [{
                name: "Source",
                value: 1
            }, {
                name: "Shaker",
                value: 2
            }, {
                name: "Target",
                value: 3
            }];

            $scope.saveComponent = function(){
                var component = $scope.component;
                var newComponent = new Component(component);
                newComponent.$save(function(p, resp){
                    if(!p.error){
                        $location.path('components');
                    } else{
                        alert('Could not create Component');
                    }
                });
            };
        }]);

// Creating a new Component
componentControllers.controller('ComponentNewController', ['$scope', 'Component', '$location',
        function JobDescriptionNewController($scope, Component, $location){
            $scope.component = {
                name: "",
                type: "",
                description: "",
                created: "",
                processCallback: "",
                config: ""
            };

            $scope.editorOptions = {
                lineWrapping: true,
                lineNumbers: true,
                mode: 'text/javascript'
            };

            $scope.componentTypes = [{
                name: "Source",
                value: 1
            }, {
                name: "Shaker",
                value: 2
            }, {
                name: "Target",
                value: 3
            }];

            $scope.saveComponent = function(){
                var component = $scope.component;
                var newComponent = new Component(component);
                newComponent.$save(function(p, resp){
                    if(!p.error){
                        $location.path('components');
                    } else{
                        alert('Could not create Component');
                    }
                });
            };
        }]);