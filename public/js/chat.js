$(function () {
    const TYPING_TIMER_LENGTH = 400;
    let typing = false;
    function getCookie(name) {
        var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    }

    const updateTyping = () => {
        if (connected) {
            if (!typing) {
                typing = true;
                socket.emit('typing');
            }
            lastTypingTime = (new Date()).getTime();

            setTimeout(() => {
                var typingTimer = (new Date()).getTime();
                var timeDiff = typingTimer - lastTypingTime;
                if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
                socket.emit('stop typing');
                typing = false;
                }
            }, TYPING_TIMER_LENGTH);
        }
    }

    let nickname = getCookie('nickname');

    function encryptDES(message, key) {
      var keyHex = CryptoJS.enc.Utf8.parse(key);
      var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.toString();
    }

    function sendMessage() {
        let msg = $("#inputMessage").val();
        var encrypted = encryptDES(msg, getCookie('chatkey'));
        if (msg === undefined || msg.length > 0) {
            socket.emit("chat message", {sender: nickname, message: msg});
            socket.emit("chat message", {sender: nickname, message: encrypted});
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
            socket.emit('stop typing');
            typing = false;
        }
    });

    $('#inputMessage').on('input', () => {
        updateTyping();
    })

    let socket = io();

    $("form").submit(function (e) {
        e.preventDefault();

    });

    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(`${msg.sender}: ${msg.message}`));
    });
});
