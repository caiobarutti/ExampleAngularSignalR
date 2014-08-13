﻿(function() {
    angular.module('app', []);

    $(function() {
        $.connection.hub.logging = true;
        $.connection.hub.start();
    });

    $.connection.hub.error(function(err) {
        console.log('An error ocurred: ' + err);
    });

    angular.module('app')
        .value('chat', $.connection.chat)
        .value('toastr', toastr);
})();