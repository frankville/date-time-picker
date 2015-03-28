app = angular.module("dateTest",["ngMaterial","angular-gestures"]);
app.controller("myController",["$scope",function($scope){
	$scope.currDate = new Date();
}]);

app.directive("dateCombo",function() {

		return {
		restrict:"E",

		scope:{
			date: "=currDate"
		},
		controller : function($scope,$mdDialog){

			var DialogController = function(scope,$mdDialog,date){
				console.log("dae "+date);
				scope.currDate = date;
				scope.okDialog = function(){
					
					scope.closeDialog();
				}
				scope.closeDialog = function() {
			          $mdDialog.hide();
			      }
		    }

			$scope.showCalendar = function(event){
					
				$mdDialog.show({
			         parent: angular.element(document.body),
			         targetEvent: event,
			         templateUrl:"calendarDialog.html",
			         locals: {
			           date: $scope.date
			         },
			         controller: DialogController
		      	});



				/*
				zoneDeleteService.deleteZone({zoneid:z["_id"]}).$promise.then(function(a,b){
					console.log("zona borrada");
					$scope.setAlert("success","La zona "+z.zoneName+" fue borrada del sistema");
					$scope.getZones();
				});

				*/
			}

			
			/*
				{
					name: "Diciembre"
				}

			*/
		},

		templateUrl: function(elem,attr){
			
			return 	"dateTimeCombo.html";
		}


	};
	
})

app.directive("dateTimePicker",["$interval","dateFilter", function($interval,dateFilter){
	return {
		restrict:"E",
		require:"^dateCombo",

		scope:{
			currDate: "=currentDate"
		},
		controller: function($scope){
			$scope.getHours = function(){
				var a = [];
				for(var i=0;i<24;i++){
					a.push(i);
				}

				return a;
			}
		
			$scope.getMinutes = function(){
				var a = [];
				for(var i=0;i<60;i++){
					a.push(i);

				}

				return a;
			}
			$scope.weeksOfMonth = function ( y, m ) {
			    var first = new Date(y, m,1).getDay();      
			    var last = 32 - new Date(y, m, 32).getDate(); 

			    // logic to calculate number of weeks for the current month
			    return Math.ceil( (first + last)/7 );   
			}

			$scope.initializeMonth = function(year,month){
				var array = [];
				var weeks = $scope.weeksOfMonth(year,month);
				for(var i=0;i<weeks;i++){
					var week = [];
					for(var x=0;x<7;x++){
						var day = {};
						week.push(0);
					}
					array.push(week);
				}
				return array;
			}

			$scope.fillInMonthArray = function(currDate){
				var array = $scope.initializeMonth(currDate.getFullYear(),currDate.getMonth());
				
				var lastDay = new Date(currDate.getFullYear(), currDate.getMonth() + 1 , 0).getDate(); 
				var week = 0; 
				for(var i=1;i<=lastDay;i++){
					var date= new Date(currDate.getFullYear(), currDate.getMonth(), i);
					
					array[week][date.getDay()] =  i;
					if(date.getDay() === 6){
						week++;
					}
					
				}

				return array;
			}

			$scope.getMonthName = function(currDate){

				var name = "";
					switch((currDate.getMonth()+1)){
						case 1: name="enero"; break;
						case 2: name="febrero"; break;
						case 3: name="marzo"; break;
						case 4: name="abril"; break;
						case 5: name="mayo"; break;
						case 6: name="junio"; break;
						case 7: name="julio"; break;
						case 8: name="agosto"; break;
						case 9: name="septiembre"; break;
						case 10: name="octubre"; break;
						case 11: name="noviembre"; break;
						case 12: name="diciembre"; break;

					}
				return name;
			}

			$scope.monthArray = $scope.fillInMonthArray($scope.currDate);
			$scope.monthName = $scope.getMonthName($scope.currDate);
			$scope.minutes = $scope.getMinutes();
			$scope.hours = $scope.getHours();
			
			$scope.hour = $scope.hours[$scope.currDate.getHours()];
			
			$scope.minute = $scope.minutes[$scope.currDate.getMinutes()];


			

			$scope.weeks = $scope.weeksOfMonth($scope.currDate.getFullYear(),$scope.currDate.getMonth());


			$scope.goBack = function(event,currHour) {
				$scope.currDate.setMonth($scope.currDate.getMonth() -1 );
				$scope.monthArray = $scope.fillInMonthArray($scope.currDate);
		       	$scope.monthName = $scope.getMonthName($scope.currDate);

			}



			$scope.goForward = function(event,currHour) {
				$scope.currDate.setMonth($scope.currDate.getMonth() +1 );
				$scope.monthArray = $scope.fillInMonthArray($scope.currDate);
		       	$scope.monthName = $scope.getMonthName($scope.currDate);
			}
			/*
			$scope.$watch('currDate', function(n,o) {
		       $scope.currDate = n;
		       $scope.monthArray = $scope.fillInMonthArray($scope.currDate);
		       $scope.monthName = $scope.getMonthName($scope.currDate);
		    });
*/
		$scope.$watch('minute', function(n,o) {
	       $scope.currDate.setMinutes(n);
	       
		});

		$scope.$watch('hour', function(n,o) {
	       $scope.currDate.setHours(n);
	       
		});

		$scope.selectDay = function(day){
			$scope.currDate.setDate(day);
		}

		},
		templateUrl: function(elem,attr){
			
			return 	"dateTimePicker.html";
		}


	};
}]);