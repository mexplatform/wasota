main.controller('searchCtrl', ['$scope', '$http',"NgTableParams", 'generalData', function ($scope, $http, NgTableParams, $generalData) {

  $scope.serverURL = $generalData.serverURL;
  $scope.formats = [
    { name: "turtle", format: "ttl" },
    { name: "rdf/xml", format: "rdfxml" },
    { name: "nt", format: "nt" }
  ];


 $scope.contextList = ["loading..."];
  
 $scope.updatePerformance = function(){
    $http.post("/proxy/performance", JSON.stringify({context: $scope.context})).
    then(function (response) {
      $scope.performanceList=response.data.performanceList;
    }, function (response) {
      $scope.apiResponse = "Error: " + response.data;
      $scope.showApiResponse = true;
      }
 );
  }
  
   $scope.updateTable = function(){
    $http.post("/proxy/performance/get", JSON.stringify({context: $scope.context, performance: $scope.performance})).
    then(function (response) {
      console.log(response.data.performanceListFinal)

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    });
}

$scope.results = sortByKey(response.data.performanceListFinal, 'value');
    }, function (response) {
      $scope.apiResponse = "Error: " + response.data;
      $scope.showApiResponse = true;
      }
 );
  }


$http.get("/proxy/context").
    then(function (response) {
      $scope.contextList=response.data;
    }, function (response) {
      $scope.apiResponse = "Error: " + response.data;
      $scope.showApiResponse = true;
      }
 );
    
    
var data = $scope.results;
this.tableParams = new NgTableParams({        sorting: {
            value: 'asc'     
        }}, { dataset: data});
    
}]);
    