var jobControllers = angular.module('jobControllers', []);

// Managing the job list
jobControllers.controller('JobListController', ['$scope', 'Job', 'Component', function($scope, Job, Component){
    $scope.jobs = Job.query();

    $scope.refresh = function(){
        $scope.jobs = Job.query();
    };

    $scope.query = {};
    $scope.query.status = "";

    $scope.stati = [{
        code: '',
        name: 'All'
    }, {
        code: 0,
        name: 'Starting'
    }, {
        code: 1,
        name: 'In Process'
    }, {
        code: 2,
        name: 'Finished'
    }, {
        code: 3,
        name: 'Error'
    }];

    $scope.rowClass = function(status){
        switch(status){
            case 0:
                return 'warning';
            case 1:
                return '';
            case 2:
                return 'success';
            case 3:
                return 'danger';
            default:
                return 'danger';
        }
    };

    $scope.getStatusName = function(status){
        switch(status){
            case 0:
                return 'Starting';
            case 1:
                return 'In Process';
            case 2:
                return 'Finished';
            case 3:
                return 'Error';
            default:
                return 'WTF!';
        }
    };

}]);

// viewing individual jobs
jobControllers.controller('JobItemController', ['$scope', '$routeParams', 'Job', function($scope, $routeParams, Job){
    $scope.job = Job.get({
        jobId: $routeParams.jobId
    });

    $scope.logs = Job.logs({
        jobId: $routeParams.jobId
    });

    $scope.refresh = function(){
        $scope.logs = Job.logs({
            jobId: $routeParams.jobId
        });
    };

    $scope.rowClass = function(status){
        switch(status){
            case 'ERROR':
                return 'danger';
            case 'INFO':
                return 'success';
            case 'TRACE':
                return '';
            case 'WARN':
                return 'warning';
            default:
                return 'danger';
        }
    };
}]);