main.controller('homeCtrl', ['$scope', '$http', 'generalData', function ($scope, $http, $generalData) {

$scope.appName = $generalData.appName;
$scope.serverURL = $generalData.serverURL;

}]);