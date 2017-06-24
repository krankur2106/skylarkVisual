var app=angular.module("skylark",['ngRoute','ngMap',"ngStorage",'angular-loading-bar','ui.bootstrap']);

/*--------------- Application page route ---------------*/
var $routeProviderReference;  
app.config(function ($routeProvider,$httpProvider) {  
    $routeProviderReference = $routeProvider;
	$httpProvider.interceptors.push('APIInterceptor');
});  

/*--------------- Progress bar ---------------*/
app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
	cfpLoadingBarProvider.includeSpinner = false;
}]);
/*--------------- factory for api interaction ---------------*/
app.factory('apiResults', ['$http', function($http) {
	return function(url,param){
        return $http({
            method: 'GET',
            url:'http://127.0.0.1:8000/homePageApi/'+url,
            params: param,
		}).success(function(data){
			return (data);	
		});
    }
}]);
/*--------------- Height of pages as per window size ---------------*/
function wrapHeight(){
	var whgt = $(window).height();
	var wraphgt='';
	if (whgt < 400)
	{
		wraphgt = '500px';
	}else{
		wraphgt = whgt - ($('.navbar .row').height()) - ($('.footer').outerHeight());
	}
	return wraphgt;
}

/*--------------- refresh Token on page redirection ---------------*/
app.factory('refreshToken', ['$http', function($http) { 
	return function(param){
		return $http({
		   method: 'GET',
		   url:"/login/refreshtoken",
		   params:param,
		});
	}
}]);

/*--------------- JWT token - It will include on all async call ---------------*/
app.service('APIInterceptor', ['$localStorage','$location',function($localStorage,$location) {
    var service = this;
	$localStorage.token = window.sessionToken;
	var jwtInterceptor = {
        request: function(config) {
            config.headers.Authorization= "JWT "+$localStorage.token;
            return config;
        },
		responseError: function(rejection) {
			console.log('Error in response ', rejection.status);
			if ((rejection.status === 403) || (rejection.status === 404)) {
				window.open('/login', '_self');
			}
			return rejection;
		}
    };
    return jwtInterceptor;
}]);