var app = angular.module('shopApp', ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
    .when('/',{
        controller: 'shopController',
        templateUrl: 'partials/shop.html'
    })
    .when('/login',{
        controller: 'loginController',
        templateUrl: 'partials/login.html'
    })
    .otherwise({
        redirectTo: '/login'
    });
});



app.controller('shopController', function($scope, $location){
    if(!localStorage.cookie)$location.path('/login');
    var shopData = {
        "err": 0,
        "daily_income": 100,
        "monthly_income":200,
        "total_income": 300,
        "transfer_list": [
        {"how_much": '10',"ctime": '11：02',"real_name": "张三"},
        {"how_much": '20',"ctime": '2：10',"real_name": "张三"},
        {"how_much": '30',"ctime": '3：11',"real_name": "张三"},
        {"how_much": '40',"ctime": '4：10',"real_name": "张三"},
        {"how_much": '50',"ctime": '5：33',"real_name": "张三"},
            {"how_much": '110',"ctime": '6：22',"real_name": "张三"},
            {"how_much": '120',"ctime": '7：11',"real_name": "张三"},
            {"how_much": '130',"ctime": '8：09',"real_name": "张三"},
            {"how_much": '140',"ctime": '9：01',"real_name": "张三"},
            {"how_much": '150',"ctime": '10：10',"real_name": "张三"},
            {"how_much": '110',"ctime": '11：03',"real_name": "张三"},
            {"how_much": '120',"ctime": '12：22',"real_name": "张三"},
            {"how_much": '130',"ctime": '13：33',"real_name": "张三"},
            {"how_much": '140',"ctime": '14：44',"real_name": "张三"},
            {"how_much": '150',"ctime": '15：44',"real_name": "张三"},
            {"how_much": '150',"ctime": '16：44',"real_name": "张三"}
        ]
    };
   
    $scope.currentPage = 0;
    $scope.eachPage = 5;
    $scope.rate = 200;
    $scope.daily_income = shopData.daily_income;
    $scope.monthly_income = shopData.monthly_income;
    $scope.total_income = shopData.total_income;
    $scope.transfer_list = shopData.transfer_list;
    var length = parseInt($scope.transfer_list.length/$scope.eachPage);
    $scope.totalPage = ($scope.transfer_list.length%$scope.eachPage == 0)? (length-1):length;
    $scope.divList = function(page){
       if(page == 0){
        $scope.currentPage = 0;
       }else if(page){
        $scope.currentPage += page;
       }else {

       }
       var length = $scope.transfer_list.length;
       var start = $scope.currentPage * $scope.eachPage;
       var end = (start + $scope.eachPage > length)? length: start + $scope.eachPage;
       $scope.list = $scope.transfer_list.slice(start,end);
    }

    $scope.divList();
    $scope.logout = function(){
        delete localStorage.cookie;
        $location.path('/login');
    }
});

app.controller('loginController', function($scope, $location){
    $scope.clickInfo = function(){
        $scope.errorInfo = '';
    }

    $scope.login = function(){
       if ($scope.username) {
            if ($scope.password) {
                if($scope.username == 'admin'){
                    if($scope.password == 'admin'){
                        localStorage.cookie = "username";
                        $location.path('/');
                    }
                    else $scope.errorInfo = '密码不正确';
                }else $scope.errorInfo = "用户名不正确";
            } else {
                $scope.errorInfo = "密码为空";
            }
        } else {
            $scope.errorInfo = "用户名为空";
        }
        if($scope.errorInfo){
            $scope.errorInfo = '*' + $scope.errorInfo;
        }
    }
});