$(function () {
    let socket = io();
    
    $("form").submit(function (e) {
        e.preventDefault();
        let msg = $("#m").val();
        if (msg.length > 0) {
            socket.emit("chat message", msg);
            $("#m").val("");
        }
        return false;
    });
    
    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg));
    });
});