var jobDescriptionControllers = angular.module('jobDescriptionControllers', ['ngResource']);

// Managing the job description list
jobDescriptionControllers.controller('JobDescriptionListController', ['$scope', 'JobDescription', '$resource',
        function($scope, JobDescription, $resource){
            $scope.jobDescriptions = JobDescription.query();

            $scope.launchJob = function(jobId){
                var Launch = $resource('/schedule/:id', {
                    id: '@id'
                });
                Launch.get({
                    id: jobId
                });
            };
        }]);

// viewing individual job descriptions
jobDescriptionControllers.controller('JobDescriptionItemController', ['$scope', '$routeParams', 'JobDescription',
        '$location', 'Component', function($scope, $routeParams, JobDescription, $location, Component){
            $scope.jobDescription = JobDescription.get({
                jobDescriptionId: $routeParams.jobDescriptionId
            });

            $scope.components = Component.query();

            $scope.addComponent = function(t){
                $scope.jobDescription.components.push({
                    type: t,
                    processCallback: "",
                    config: "",
                    _id: ""
                });
            };

            $scope.saveJobDescription = function(){
                var jobDescription = $scope.jobDescription;
                var newJobDescription = new JobDescription(jobDescription);
                newJobDescription.$save(function(p, resp){
                    if(!p.error){
                        $location.path('job-descriptions');
                    } else{
                        alert('Could not create Job Description');
                    }
                });
            };

            $scope.selectComponent = function(index, t){
                var clone = _.filter($scope.jobDescription.components, function(item){
                    return item.type == t;
                });
                newComponent = _.findWhere($scope.components, {
                    _id: clone[index]._id
                });
                var i = $scope.jobDescription.components.indexOf(clone[index]);
                $scope.jobDescription.components[i].name = newComponent.name;
                $scope.jobDescription.components[i].config = newComponent.config;
                $scope.jobDescription.components[i].processCallback = newComponent.processCallback;
            };

            $scope.deleteComponent = function(component){
                var i = $scope.jobDescription.components.indexOf(component);
                $scope.jobDescription.components.splice(i, 1);
            };
        }]);

// Creating a new Job Description
jobDescriptionControllers.controller('JobDescriptionNewController', ['$scope', 'JobDescription', '$location',
        'Component', function JobDescriptionNewController($scope, JobDescription, $location, Component){
            $scope.jobDescription = {
                owner: "",
                created: '',
                components: [{
                    type: 1,
                    processCallback: "",
                    config: "",
                    _id: "",
                }, {
                    type: 2,
                    processCallback: "",
                    config: "",
                    _id: "",
                }, {
                    type: 3,
                    processCallback: "",
                    config: "",
                    _id: "",
                }],
                schedule: ""
            };

            $scope.components = Component.query();

            $scope.addComponent = function(t){
                $scope.jobDescription.components.push({
                    type: t,
                    processCallback: "",
                    config: "",
                    _id: ""
                });
            };

            $scope.saveJobDescription = function(){
                var jobDescription = $scope.jobDescription;
                var newJobDescription = new JobDescription(jobDescription);
                newJobDescription.$save(function(p, resp){
                    if(!p.error){
                        $location.path('job-descriptions');
                    } else{
                        alert('Could not create Job Description');
                    }
                });
            };

            $scope.selectComponent = function(index, t){
                var clone = _.filter($scope.jobDescription.components, function(item){
                    return item.type == t;
                });
                newComponent = _.findWhere($scope.components, {
                    _id: clone[index]._id
                });
                var i = $scope.jobDescription.components.indexOf(clone[index]);
                $scope.jobDescription.components[i].name = newComponent.name;
                $scope.jobDescription.components[i].config = newComponent.config;
                $scope.jobDescription.components[i].processCallback = newComponent.processCallback;
            };

            $scope.deleteComponent = function(component){
                var i = $scope.jobDescription.components.indexOf(component);
                $scope.jobDescription.components.splice(i, 1);
            };
        }]);