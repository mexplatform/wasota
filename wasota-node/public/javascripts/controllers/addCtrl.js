main.controller('addCtrl', ['$scope', '$http', 'generalData', function ($scope, $http, $generalData) {

  $scope.serverURL = $generalData.serverURL;
  $scope.formats = [
    { name: "turtle", format: "ttl" },
    { name: "rdf/xml", format: "rdfxml" },
    { name: "nt", format: "nt" }
  ];

  $scope.choosenFormat = $scope.formats[0];
  
  
  $scope.sendGraph = function () {
    $http.put("/proxy/graph", 
    { graphName: $scope.graphIdentifier, format: $scope.choosenFormat.format, graph: $scope.graph }).
      then(function (response) {
        $scope.showApiResponse = true;
        console.log(response.data);
        if(response.data.status == "ok")
          $scope.coreMsg = "Graph added!";
        else
          $scope.coreMsg = "Error adding graph.";
          
      }, function (response) {
        $scope.showApiResponse = true;
        $scope.apiResponse = "Error: " + response.data;
        $scope.showApiResponse = true;
      });
  };

}]);