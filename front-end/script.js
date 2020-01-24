var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http, filterFilter) {
    $scope.checkbox = {
        value: true
    };
    var env = {
        MY_HOST_IP:'18.222.179.155'
    }
    $scope.checkboxes = [
        { name: 'git', selected: true },
        { name: 'jenkins', selected: true },
        { name: 'docker', selected: false },
        { name: 'kubernetes', selected: false },
        { name: 'sonarqube', selected: false },
        { name: 'selenium', selected: false },
        { name: 'aws', selected: false },
        { name: 'azure', selected: false },
        { name: 'gcp', selected: false },
        { name: 'helm', selected: false },
        { name: 'subversion', selected: false },
        { name: 'vagrant', selected: false },
        { name: 'prometheus', selected: false },
        { name: 'grafana', selected: false },
        { name: 'bitbucker', selected: false },
        { name: 'openshift', selected: false },
        { name: 'ansible', selected: false },
        { name: 'spinnaker', selected: false },
        { name: 'redis', selected: false },
        { name: 'portainer', selected: false },
        { name: 'elk', selected: false },
        { name: 'jenkins x', selected: false },
        { name: 'nagios', selected: false }
    ]
    $scope.selection = []
    $scope.checkbox_function = function () {
        return filterFilter($scope.checkboxes, { selected: true });
    }
    $scope.$watch('checkboxes|filter:{selected:true}', function (nv) {
        $scope.selection = nv.map(function (fruit) {
            return fruit.name;
        });
    }, true);

    $scope.api = "http://"+env.MY_HOST_IP+":5000"
    $scope.video_tutorial_list = [];

    $http({
        method: 'GET',
        url: $scope.api+'/?search=git,jenkins'
    }).then(function successMethod(res) {
        $scope.video_tutorial_list = res.data;
        console.log("Data: " + res.data);
    }, function failureMethod(res) {
        console.error("Error " + res.data)
    });

    $scope.videoSearch = function (val) {
        $scope.video_tutorial_list = [];
        console.log(val);
        url = $scope.api+'/?search=' + val
        //alert(url);
        $http({
            method: 'GET',
            url: url
        }).then(function successMethod(res) {
            $scope.video_tutorial_list = res.data;
            console.log("Data: " + res.data);
        }, function failureMethod(res) {
            console.error("Error " + res.data)
        })
    }

});
