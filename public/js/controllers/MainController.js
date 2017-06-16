app.controller('MainController', ['$scope', '$rootScope', function($scope, $rootScope) {
    this.$scope = $scope;
    
    $scope.htmlClass = true;
    
    $scope.navigationItems = [
        {
            title: 'Dashboard',
            iconClass: 'fa fa-dashboard',
            uiSref: 'dashboard'
        },
        {
            title: 'Control',
            iconClass: 'fa fa-gamepad',
            uiSref: 'control'
        },
        {
            title: 'About',
            iconClass: 'fa fa-shield',
            uiSref: 'about'
        }
    ];
    
    $scope.$on('htmlClass', function(event, args){
        $scope.htmlClass = args;
    });
}]);