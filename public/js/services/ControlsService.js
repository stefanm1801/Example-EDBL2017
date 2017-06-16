app.factory(
    'ControlsService' ,[
    '$q', '$http', 'apiWrapperService',
    function ($q, $http, apiWrapperService) {
        return {
            startEngine: function (direction) {
                var deferred = $q.defer();

                var postData = { direction: direction };

                $http.post('/start-engine', postData).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.resolve(null);
                });

                return deferred.promise;
            },

            stopEngine: function () {
                var deferred = $q.defer();

                $http.post('/stop-engine').success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.resolve(null);
                });

                return deferred.promise;
            },

            rotatePlatform: function (direction) {
                var deferred = $q.defer();

                var postData = { direction: direction };

                $http.post('/rotate-platform', postData).success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.resolve(null);
                });

                return deferred.promise;
            },

            currentStatuses: function () {
                var deferred = $q.defer();

                $http.get('/current-statuses').success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.resolve(null);
                });

                return deferred.promise;
            }
        };
    }]);