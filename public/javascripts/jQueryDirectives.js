var jQueryDirectives = angular.module('jQueryDirectives', []);

jQueryDirectives.directive('gentleSelect', function(){
    return {
        priority: 1001,
        // Restrict it to be an attribute in this case
        restrict: 'A',
        // responsible for registering DOM listeners as well as updating the DOM
        link: function(scope, element, attrs){
            $(element).gentleSelect();
        }
    };
});

jQueryDirectives.directive('cron', function($parse, $timeout){
    return {
        restrict: "E",
        replace: true,
        transclude: false,
        // responsible for registering DOM listeners as well as updating the DOM
        compile: function(element, attrs){
            var modelAccessor = $parse(attrs.ngModel);

            var html = "<div id='" + attrs.id + "' >" + "</div>";

            var newElem = $(html);
            element.replaceWith(newElem);

            return function(scope, element, attrs, controller){
                var processChange = function(){
                    var value = element.cron("value");
                    modelAccessor.assign(scope, value);
                    $timeout(function(){
                        scope.$apply();
                    });

                };

                element.cron({
                    onChange: processChange,
                    useGentleSelect: true
                // default: false
                });

                scope.$watch(modelAccessor, function(val){
                    element.cron("value", val);
                });
            };
        }
    };
});