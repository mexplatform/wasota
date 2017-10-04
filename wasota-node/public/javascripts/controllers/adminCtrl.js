main.controller('adminCtrl', ['$scope', '$http',"NgTableParams", 'generalData', function ($scope, $http,NgTableParams, $generalData) {

//SESSION

function readCookie(name) {
	
    var i, c, ca, nameEQ = name + "=";

    ca = document.cookie.split(';');
    for(i=0;i < ca.length;i++) {
        c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return '';
}

var sId = readCookie('sessionId')

var values = sId.split('~');
var username = values[0];
var password = values[1];

document.getElementById("MyEdit").innerHTML = username;


// SEND USER GRAPH
  $scope.serverURL = $generalData.serverURL;
  $scope.formats = [
    { name: "turtle", format: "ttl" },
    { name: "rdf/xml", format: "rdfxml" },
    { name: "nt", format: "nt" }
  ];

  $scope.choosenFormat = $scope.formats[0];
  
  $scope.sendUserGraph = function () {
    $http.put("/proxy/user/graph/add/",
    { user: username, password: password, graphName: $scope.graphUserIdentifier, format: $scope.choosenFormat.format, graph: $scope.userGraph}).
      then(function (response) {
        $scope.showApiResponse = true;
        console.log(response.data);
		window.alert(response.data.status);
        if(response.data.status == "ok"){
          $scope.coreMsg = "Graph added!";
		  location.reload();
		}
        else
          $scope.coreMsg = "Error adding graph.";
          
      }, function (response) {
        $scope.showApiResponse = true;
        $scope.apiResponse = "Error: " + response.data;
        $scope.showApiResponse = true;
      });
  };
  
  
  //LIST USER EXPERIMENTS
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
  
   // $scope.updateTable = function(){
    $http.post("/proxy/user/performance", { user: username, password: password},JSON.stringify({context: $scope.context, performance: $scope.performance})).
    then(function (response) {
      $scope.results = (response.data);
      var data = $scope.results;
this.tableParams = new NgTableParams( { dataset: data});

// function sortByKey(array, key) {
//     return array.sort(function(a, b) {
//         var x = a[key]; var y = b[key];
//         return ((x < y) ? 1 : ((x > y) ? -1 : 0));
//     });
// }

  // $scope.results = sortByKey(response.data.performanceListFinal, 'value');
    }, function (response) {
      $scope.apiResponse = "Error: " + response.data;
      $scope.showApiResponse = true;
      }
 );
  // }


// $http.get("/proxy/context").
//     then(function (response) {
//       $scope.contextList=response.data;
//     }, function (response) {
//       $scope.apiResponse = "Error: " + response.data;
//       $scope.showApiResponse = true;
//       }
//  );
    
    
// var data = $scope.results;
// this.tableParams = new NgTableParams({        sorting: {
//             value: 'asc'     
//         }}, { dataset: data});


$scope.changeExperiment = function(experiment){
    var ex = JSON.stringify(experiment.url);
    $http.put("/proxy/user/changeExperiment",{ user: username, password: password, experimentURI: experiment.url}).
    then(function (response) {
      console.log(response);

    }, function (response) {
      $scope.apiResponse = "Error: " + response.data;
      }
 );
}

}]);