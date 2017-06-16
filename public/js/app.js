var app = angular.module('app', ['patternfly.navigation', 'patternfly.charts', 'patternfly.card', 'ui.router', 'base64']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    
    $stateProvider.state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'views/login.html'
    });
    
    $stateProvider.state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard.html',
        controller : "DashboardController",
        resolve: {authenticate: checkAuth}
    });
    
    $stateProvider.state('control', {
        url: '/control',
        templateUrl: 'views/control.html',
        controller : "ControlsController",
        resolve: {authenticate: checkAuth}
    });
    
    $stateProvider.state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        resolve: {authenticate: checkAuth}
    });
    
    function checkAuth($q, $state, $timeout, UserService) {
       UserService.isLoggedIn().then(function(authStatus) {
            if (authStatus) {
                return $q.when();
            } else {
                $timeout(function() {
                    $state.go('login');
                });
                
                return $q.reject();
            }
       });
    }
});