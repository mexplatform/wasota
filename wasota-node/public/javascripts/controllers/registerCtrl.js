main.controller('registerCtrl', ['$scope', '$http', 'generalData', function ($scope, $http, $generalData) {

  $scope.serverURL = $generalData.serverURL;
  
  $scope.sendUser = function () {
    $http.put("/proxy/user/add", 
    { registerUser: $scope.userName, registerPassword: $scope.userPassword, registerEmail: $scope.userEmail }).
      then(function (response) {
        $scope.showApiResponse = true;
        console.log(response.data);
        if(response.data.status == "ok")
          $scope.coreMsg = "User added!";
        else
          $scope.coreMsg = "Error adding user.";
          
      }, function (response) {
        $scope.showApiResponse = true;
        $scope.apiResponse = "Error: " + response.data;
        $scope.showApiResponse = true;
      });
  };

}]);// JavaScript Document