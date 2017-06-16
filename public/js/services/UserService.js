app.factory('UserService', ['$q','apiWrapperService', '$http', function ($q, apiWrapperService, $http) {
    return {
        login: function (username, password) {
            var deferred = $q.defer();

            var authdata = {username: username, password: password};

            $http.post('/login', authdata).success(function(data, status, headers, config) {
                deferred.resolve(data);
            }).error(function(data, status, headers, config) {
                deferred.resolve(null);
            });

            return deferred.promise;            
        },
        logout: function () {
            var deferred = $q.defer();

            $http.post('/logout').success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                deferred.resolve(null);
            });

            return deferred.promise;
        },
        isLoggedIn: function () {
            var deferred = $q.defer();

            $http.post('/check-login-status').success(function (data, status, headers, config) {
                deferred.resolve(data.status);
            }).error(function (data, status, headers, config) {
                deferred.resolve(null);
            });

            return deferred.promise;
        }
    };
}]);