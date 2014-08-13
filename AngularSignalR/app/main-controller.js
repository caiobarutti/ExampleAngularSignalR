angular.module('app').controller('main-controller', ["$scope", "chat", "toastr", function ($scope, chat, toastr) {
    $scope.messages = [];

    $scope.inRoom = false;
    $scope.nameSet = false;

    $scope.setName = setName;

    $scope.joinRoom = joinRoom;

    $scope.leaveRoom = leaveRoom;

    $scope.sendMessage = function () {
        sendMessage();
    };

    chat.client.newNotification = function (notificationMessage) {
        toastr.success(notificationMessage);
    }

    $scope.sendMessageEnter = function (keyEvent) {
        if (keyEvent.which === 13)
            sendMessage();
    }

    $scope.setNameEnter = function (keyEvent) {
        if (keyEvent.which === 13)
            setName();
    }

    $scope.joinRoomEnter = function (keyEvent) {
        if (keyEvent.which === 13)
            joinRoom();
    }

    chat.client.newMessage = onNewMessage;

    function leaveRoom() {
        $scope.inRoom = false;
        chat.server.leaveRoom($scope.roomName, $scope.name);
    }

    function setName() {
        $scope.nameSet = true;
        toastr.success("Welcome " + $scope.name);
    }

    function joinRoom() {
        $scope.inRoom = true;
        chat.server.joinRoom($scope.roomName, $scope.name);
    }

    function onNewMessage(message) {
        displayMessage(message);
        updateDiv();
        dropDiv();
    };

    function sendMessage() {
        chat.server.sendMessage({ name: $scope.name, message: $scope.newMessage, roomName: $scope.roomName });
        displayMessage("You: " + $scope.newMessage);
        $scope.newMessage = "";
        dropDiv();
    }

    function displayMessage(message) {
        $scope.messages.push({ message: message });
    }

    function updateDiv() {
        $scope.$apply();
    }

    function dropDiv() {
        var objDiv = document.getElementById("divChat");
        objDiv.scrollTop = objDiv.scrollHeight + 100;
    }
}]);