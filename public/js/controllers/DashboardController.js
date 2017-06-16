app.controller('DashboardController', ['$scope', '$state', 'DashboardService', function($scope, $state, DashboardService) {
    this.$scope = $scope;
    this.$state = $state;
    
    $scope.$emit('htmlClass', false);
    
    $scope.temperatureConfig = {
        chartId: 'temperature-chart',
        title: 'Temperature',
        layout: 'large',
        timeFrame: 'Last 20 Minutes',
        units: '℃'
    };
    
    $scope.temperatureChartHeight = 100;
    $scope.temperatureChartShowX = true;
    $scope.temperatureChartShowY = false;
    $scope.temperatureData = {
        total: 0, xData: [], yData: [], dataAvailable: false
    };
    
    $scope.humidityConfig = {
        chartId: 'humidity-chart',
        title: 'Humidity',
        layout: 'large',
        timeFrame: 'Last 20 Minutes',
        units: 'mb'
    };
    
    $scope.humidityChartHeight = 100;
    $scope.humidityChartShowX = true;
    $scope.humidityChartShowY = false;
    $scope.humidityData = {total: 0, xData: [], yData: [], dataAvailable: false};
    
    $scope.lightConfig = patternfly.c3ChartDefaults().getDefaultDonutConfig('Level of light');
    
    $scope.init = function() {
        DashboardService.getLightsData().then(function(data) {
            if (data) {
                $scope.lightConfig.data = data;
            }
        });
        
        DashboardService.getTemperatureData().then(function(data) {
            if (data) {
                var formatedDates = [];
                
                $.each(data.xData, function(key, value ) {
                    if (key > 0) {
                        formatedDates.push(new Date(value));
                    } else {
                        formatedDates.push(value);
                    }
                });
                
                $scope.temperatureData = data;
                $scope.temperatureData.xData = formatedDates;
            }
        });
        
        DashboardService.getHumidityData().then(function(data) {
            if (data) {
                var formatedDates = [];
                
                $.each(data.xData, function(key, value ) {
                    if (key > 0) {
                        formatedDates.push(new Date(value));
                    } else {
                        formatedDates.push(value);
                    }
                });
                
                $scope.humidityData = data;
                $scope.humidityData.xData = formatedDates;
            }
        });

    };
}]);