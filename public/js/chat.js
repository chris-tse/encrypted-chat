$(function () {
    const TYPING_TIMER_LENGTH = 400;
    let typing = false;
    function getCookie(name) {
        var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    }
    
    let nickname = getCookie('nickname');
    
    function sendMessage() {
        let msg = $("#inputMessage").val();
        if (msg === undefined || msg.length > 0) {
            socket.emit("chat message", {sender: nickname, message: msg});
            $("#inputMessage").val("");
        }
        return false;
    }
    
    
    $(window).keydown(e => {
        if (!(e.ctrlKey || e.metaKey || e.altKey)) {
            $('#inputMessage').focus();
        }
        
        if (e.which === 13) {
            sendMessage();
        }
    });
    
    let socket = io();
    
    $("form").submit(function (e) {
        e.preventDefault();
        
    });
    
    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(`${msg.sender}: ${msg.message}`));
    });
    
    
});