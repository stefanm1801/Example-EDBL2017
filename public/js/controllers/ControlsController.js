app.controller('ControlsController', ['$scope', '$state', '$timeout', 'ControlsService', function ($scope, $state, $timeout, ControlsService) {
    this.$scope = $scope;
    this.$state = $state;

    $scope.$emit('htmlClass', false);

    $scope.speedPercentage = 0;
    $scope.speedValue = 'n/a';

    $scope.temperaturePercentage = 0;
    $scope.temperatureValue = 'n/a';

    $scope.distancePercentage = 0;
    $scope.distanceValue = 'n/a';

    $scope.engineStatus = 0;
    $scope.platformDirection = 0;

    $scope.moveBack = false;
    $scope.moveForward = false;


    $scope.init = function () {
        ControlsService.currentStatuses().then(function (response) {
            if (response.success === true) {
                $scope.speedPercentage = response.speedPercentage;
                $scope.speedValue = response.speedValue;

                $scope.temperaturePercentage = response.temperaturePercentage;
                $scope.temperatureValue = response.temperatureValue;

                $scope.distancePercentage = response.distancePercentage;
                $scope.distanceValue = response.distanceValue;

                $scope.platformDirection = response.platform;
                //$scope.engineStatus = response.engine;
                $scope.engineStatus = 0;
                if ($scope.engineStatus === 1) {
                    $scope.moveBack = false;
                    $scope.moveForward = true;
                } else if ($scope.engineStatus === 2) {
                    $scope.moveBack = true;
                    $scope.moveForward = false;
                }
            }
        });
    };


    $scope.turnOffEngine = function () {
      //  ControlsService.stopEngine().then(function (response) {
           // if (response.succesls === true) {
                $scope.engineStatus = 0;
                $scope.platformDirection = 0;
                $scope.moveBack = false;
                $scope.moveForward = false;
          //  }
      //  });

    };

    $scope.goAhead = function () {
        ControlsService.startEngine('ahead').then(function (response) {
            if (response.success === true) {
                $scope.engineStatus = 1;
                $scope.moveForward = true;
                $scope.moveBack = false;
                $timeout(() => {
                    $scope.moveForward = false;
                }, 3000);

            }
        });
    };

    $scope.goBack = function () {
        ControlsService.startEngine('back').then(function (response) {
            if (response.success === true) {
                $scope.engineStatus = 1;
                $scope.moveForward = false;
                $scope.moveBack = true;
                $timeout(() => {
                    $scope.moveBack = false;
                }, 3000);


            }
        });
    };

    $scope.rotatePlatformLeft = function () {
        ControlsService.rotatePlatform('left').then(function (response) {
            if (response.success === true) {
                $scope.platformDirection = 1;
                $scope.leftPlatformDirection();
            }
        });
    };

    $scope.rotatePlatformRight = function () {
        ControlsService.rotatePlatform('right').then(function (response) {
            if (response.success === true) {
                $scope.platformDirection = 2;
                $scope.rightPlatformDirection();
            }
        });
    };


    // This is for left - right rotation

    $scope.platformdir = "NORMAL";
    $scope.rotatedegree = 0;

    //Function when platform direction is left
    $scope.leftPlatformDirection = function () {
        const me = this;
        var rotate_example = "";
        var rotate_anim = 'transform ease 500ms';
        me.platformdir = "LEFT";
        me.rotatedegree -= 10;
        rotate_example = "rotate(" + me.rotatedegree.toString() + "deg)";
        var x = angular.element(document.querySelector('#AnimaPic'));
        x[0].style.transition = rotate_anim;
        x[0].style.transform = rotate_example;
        // me.displayDirection(me.rotatedegree);
    };

    //Function when platform direction is right
    $scope.rightPlatformDirection = function () {
        const me = this;
        var rotate_example = "";
        var rotate_anim = 'transform ease 500ms';
        me.platformdir = "RIGHT";
        me.rotatedegree += 10;
        rotate_example = "rotate(" + me.rotatedegree.toString() + "deg)";
        //angular.element(document.querySelector('#AnimaPic'))[0].style.transform = rotate_example;     
        var x = angular.element(document.querySelector('#AnimaPic'));
        x[0].style.transition = rotate_anim;
        x[0].style.transform = rotate_example;
        //me.displayDirection(me.rotatedegree);
    };

    // $scope.displayDirection = function(item){
    //     const me = this;
    //     if (me.rotatedegree == 0) {
    //         me.platformdir = "NORMAL";
    //     } else if (me.rotatedegree > 0) {
    //         me.platformdir = "RIGHT";
    //     } else if (me.rotatedegree < 0){
    //         me.platformdir = "LEFT";
    //     }
    // }

}]);