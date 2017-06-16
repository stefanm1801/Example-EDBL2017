let config = {
    "user": {
        "username": "Comtrade_mario",
        "password": "KeepCalm123#",
        "basic" : "Basic "
    },
    "server": {
        "baseUrl": "",
        "port": 8081,
        "authAction": "/v1/authentication/user"
    }
};

app.factory('apiWrapperService', ['$base64', '$http',
    function ($base64, $http) {

let credentials = config.user.basic + $base64.encode(config.user.username + ":" + config.user.password);
        return {

            sentRequest(request) {
                request.url = config.server.baseUrl + request.url;

                if (!request.headers) {
                    request.headers = {};
                }

                request.headers.Authorization = credentials;
                return $http(request);
            }

        };
    }]);