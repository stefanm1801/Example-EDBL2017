app.controller('LoginController', ['$scope', '$state', 'UserService', function($scope, $state, UserService) {
    this.$scope = $scope;
    this.$state = $state;
    
    $scope.$emit('htmlClass', true);
    
    $scope.signIn = function() {
        if ($scope.item !== null && $scope.item['username'] !== null && $scope.item['password'] !== null) {
            UserService.login($scope.item.username, $scope.item.password).then(function(data) {
                if (data.success === true) {
                    $state.go('dashboard');
                } else {
                    $scope.hasError = true;
                }
            });
        }
    };
    
    $scope.signOut = function() {
        UserService.logout().then(function(data) {
            if (data.success === true) {
                $state.go('login');
            }
        });
    };
}]);