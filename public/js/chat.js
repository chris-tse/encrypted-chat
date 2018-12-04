$(document).ready(function () {

    let nickname = getCookie('nickname');

    function sendMessage(msg) {
        let ciphertext = encryptDES(JSON.stringify({sender: nickname, msg}), getCookie('chatkey')).toString();
        if (msg === undefined || msg.length > 0) {
            socket.emit('chat message', ciphertext);
            $("#inputMessage").val("");
        }
        return false;
    }

    $(window).keydown(e => {
        if (!(e.ctrlKey || e.metaKey || e.altKey)) {
            $('#inputMessage').focus();
        }
        if (e.which === 13) {
            $("form").submit();
            
        }
    });

    let socket = io();

    $("form").submit(function (e) {
        e.preventDefault();
        let msg = $('#inputMessage').val();
        sendMessage(msg);
    });
    
    $('#file').change(function() {
        console.log('triggered 1');
        console.log(this);
        readURL(this);
    })

    socket.on('chat message', function(msg){
        // msg = JSON.parse(msg);
        console.log(`Received msg: ${msg}`);
        let payload = decryptDES(msg, getCookie('chatkey'));
        let {sender, msg: message} = JSON.parse(payload);
        console.log(sender, message);
        let datetime = new Date().toLocaleString().split(', ').join(' ');
        let newMsg = $('<li></li>');
        let msgContainer = $('<div class="msgContainer"></div');
        msgContainer.append($('<span class="timestamp"></span>').text(`[${datetime}]  `)); 
        if (message.startsWith('data:image')) {
            let plain = $('<span class="plain"></span>').text(`${sender}: `);
            plain.append($('<img class="chatimg" src="' + message + '"/>'));
            msgContainer.append(plain);
        } else {
            msgContainer.append($('<span class="plain"></span>').text(`${sender}: ${message}`));
        }
        msgContainer.append($('<span class="cipher hidden"></span>').text(msg));
        newMsg.append(msgContainer);
        $('#messages').append(newMsg);
    });  
    
    function readURL(input) {
        console.log('triggered 2');
        if (input.files && input.files[0]) {
            console.log('triggered 3');
            let reader = new FileReader();

            reader.onload = function(e) {
                let dataURL = e.target.result;
                sendMessage(dataURL);
                // console.log(e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }
});

