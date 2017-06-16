app.factory('DashboardService', ['$q', '$http', function($q, $http) {
    return {
        getTemperatureData: function() {
            var deferred = $q.defer();
            
            $http.get('/temperature-chart-data').success(function(data, status, headers, config) {
                deferred.resolve(data);
            }).error(function(data, status, headers, config) {
                deferred.resolve(null);
            });
            
            return deferred.promise;
        },
        getHumidityData: function() {
            var deferred = $q.defer();
            
            $http.get('/humidity-chart-data').success(function(data, status, headers, config) {
                deferred.resolve(data);
            }).error(function(data, status, headers, config) {
                deferred.resolve(null);
            });
            
            return deferred.promise;
        },
        getLightsData: function() {
            var deferred = $q.defer();
            
            $http.get('/lights-chart-data').success(function(data, status, headers, config) {
                deferred.resolve(data);
            }).error(function(data, status, headers, config) {
                deferred.resolve(null);
            });
            
            return deferred.promise;
        }
    };
}]);