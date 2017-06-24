app.controller('skylarkWebController',function($http,$scope,$compile,NgMap,apiResults,$timeout,refreshToken,$localStorage){
	/* get All Asset Detail */
	$scope.getAssetDetail=function(){
		apiResults('getAssetDetail/',{}).success(function(data){
			$scope.assetDetail=data;
		});
	};
	/* initialize map and info window*/
	NgMap.getMap().then(function(map) {
		$scope.map = map;
	});
	$scope.showInfo=function(e,infoDetail){
		$scope.markerDetail=infoDetail;
		$scope.map.showInfoWindow('assetDetailWindow', this);
	}
	/* add marker on click */
	$scope.addMarker={};
	$scope.addMarker=function(){
		google.maps.event.addListener($scope.map, 'click', function(e) {
			$scope.$apply(function() {
				addMarker({
				lat: e.latLng.lat(),
				lng: e.latLng.lng()
			  });
			});
		});
		addMarker= function(pos){
		   $scope.addMarker.lat_lng=pos.lat+" "+pos.lng;
		   var myLatlng = new google.maps.LatLng(pos.lat,pos.lng);
		   var marker = new google.maps.Marker({
				position: myLatlng, 
				map: $scope.map
			});
		} 
	}
	/* Remove Asset */
	$scope.removeAsset=function(remove_id,remove_item){
			apiResults('removeAsset/',{remove_id,remove_item}).success(function(data){
				$scope.displayAlertBox=true;
				$scope.alertMessage='Successfully Removed';
				$timeout(function (){
					$scope.displayAlertBox=false;
				}, 4000);
				$scope.getMarkers('all');
			});
	}
	/* Add Asset */
	$scope.addAsset=function(marker_name,selected_type,lat_lng){
		if(marker_name == undefined || selected_type== undefined || lat_lng== undefined){
			$scope.displayAlertBox=true;
			$scope.alertMessage='Enter all the fields';
			$timeout(function () {
				$scope.displayAlertBox=false;
			}, 4000);
		}else{
			apiResults('updateAssetDeployment/',{marker_name,selected_type,lat_lng}).success(function(data){
				if(data==1){
					$scope.displayAlertBox=true;
					$scope.alertMessage='Successfully Added';
					$timeout(function (){
						$scope.displayAlertBox=false;
					}, 4000);
					google.maps.event.clearListeners($scope.map, 'click');
					$scope.addMarker={};
					$scope.getMarkers('all');
				}
			});
		}
	}
	/* Fetch Markers for map */
	$scope.getMarkers=function(assetType){
		apiResults('getMarkers/',{assetType}).success(function(data){
			$scope.markers=data['markers'];
			$scope.fences=data['fences'];
		});
		$scope.getAssetDetail();
	}
	$scope.getMarkers('all');
	
	/*draw free hand shape */
	$scope.drawFence = function(e) {
		// e.preventDefault();
		google.maps.event.addDomListener($scope.map.getDiv(),'mousedown',function(e){
			$scope.drawFreeHand();
		});
	}
	$scope.drawFreeHand=function(){
		temp = [];
		poly=new google.maps.Polyline({map:$scope.map,clickable:false,strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 2,zIndex:9999});
		var move=google.maps.event.addListener($scope.map,'mousemove',function(e){
			poly.getPath().push(e.latLng);
			temp.push({lat:e.latLng.lat(),lng:e.latLng.lng()});
			res=JSON.stringify(temp);
			$scope.fence_boundry=res;
		});
		google.maps.event.addListenerOnce($scope.map,'mouseup',function(e){
			google.maps.event.removeListener(move);
			var path=poly.getPath();
			poly.setMap(null);
			poly=new google.maps.Polygon({map:$scope.map,path:path});
			google.maps.event.clearListeners($scope.map.getDiv(), 'mousedown');
		});
	}
	/* draw polygon shape */
	$scope.drawPolygon=function(){
		temp_poly=[];
		poly1 = new google.maps.Polyline({
			map:$scope.map,
			path:temp_poly,
			strokeColor: '#FF0000',
			strokeOpacity: 1.0,
			strokeWeight: 2,
			editable: true,
			draggable: false,
			clickable: true
		});
		poly1.setMap($scope.map);		  
		$scope.map.addListener('click',function addLatLng(e) {
			var path = poly1.getPath();
			path.push(e.latLng);
			temp_poly.push({lat:e.latLng.lat(),lng:e.latLng.lng()});
			res_polygon=JSON.stringify(temp_poly);
			$scope.fence_boundry=res_polygon;
		});
	}
	/* add fence */
	$scope.addFence=function(fence_name){
		if(fence_name == undefined){
			$scope.displayAlertBox=true;
			$scope.alertMessage='Enter all the fields';
			$timeout(function () {
				$scope.displayAlertBox=false;
			}, 4000);
		}else{
			apiResults('addFence/',{'fence_name':fence_name,'latLng':$scope.fence_boundry}).success(function(data){
				if(data==1){
					$scope.displayAlertBox=true;
					$scope.alertMessage='Successfully Added';
					$timeout(function (){
						$scope.displayAlertBox=false;
					}, 4000);
					$scope.fence_name='';
					$scope.getMarkers('all');
				}
			});
		}
	}
	/* Add asset toFence */
	$scope.addAssetFence=function(assetId,fenceId){
		apiResults('addAssetFence/',{assetId,fenceId}).success(function(data){
			if(data==1){
					$scope.displayAlertBox=true;
					$scope.alertMessage='Successfully Added';
					$timeout(function (){
						$scope.displayAlertBox=false;
					}, 4000);
					$scope.getMarkers('all');
				}
		});
		
	}
	/* remove Asset from fence */
	$scope.removeAssetFence=function(fenceId){
		apiResults('removeAssetFence/',{fenceId}).success(function(data){
			console.log(data);
			if(data==1){
					$scope.displayAlertBox=true;
					$scope.alertMessage='Successfully Removed';
					$timeout(function (){
						$scope.displayAlertBox=false;
					}, 4000);
					$scope.getMarkers('all');
				}
		});
	}
	
	
	
	
	/*	Menu List	*/
	$scope.menuList={
		'item0':{'name':'Show All Assets','display':false},
		'item1':{'name':'Add Asset to Map','display':false},
		'item2':{'name':'Remove Asset from Map','display':false},
		'item3':{'name':'Create Fence to Map','display':false},
		'item4':{'name':'Add Asset to Fence','display':false},
		'item5':{'name':'Remove Asset to Fence','display':false},
		'item6':{'name':'Remove Asset to Fence','display':false},
	};
	$scope.selectedMenuItem=function(item){
		if(item=='item0'){
			$scope.getMarkers('all')
		}
		angular.forEach($scope.menuList, function(value, key){
			if(key!=item){				
				value.display=false;
			}else{
				value.display=true;
			}
		});
	}
	/*	Logout	*/
	$scope.userLogout =function(){
		$http.get("http://127.0.0.1:8000/authentication/logout/").success(function(data) {
			window.history.go(-window.history.length);
			window.open('/login', '_self');
        });
	}
	/*	refresh token when enter into any page	*/
	$timeout(function () {
		refreshToken({token:$localStorage.token}).success(function(data){
			$localStorage.token=data.token;	
		});
	}, 30000);
});
