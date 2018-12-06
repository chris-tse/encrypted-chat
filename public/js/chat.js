$(document).ready(function () {
    // Go back to login page if no password set
    if (!localStorage.getItem('password')) {
        window.location.href = '/';
    }
    let nickname = localStorage.getItem('nickname');

    function sendMessage(msg) {
        let ciphertext = encryptDES(JSON.stringify({sender: nickname, msg}), localStorage.getItem('password')).toString();
        if (msg === undefined || msg.length > 0) {
            socket.emit('chat message', ciphertext);
            $("#inputMessage").val("");
        }
        return false;
    }
    
    function readURL(input) {
        if (input.files && input.files[0]) {
            let reader = new FileReader();

            reader.onload = function(e) {
                let dataURL = e.target.result;
                sendMessage(dataURL);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }
    
    

    $(window).keydown(e => {
        if (!(e.ctrlKey || e.metaKey || e.altKey)) {
            $('#inputMessage').focus();
        }
        if (e.which === 13) {
            $("form").submit();
        }
    });

    $("form").submit(function (e) {
        e.preventDefault();
        let msg = $('#inputMessage').val();
        sendMessage(msg);
    });

    $('#file').change(function() {
        readURL(this);
    })

    let socket = io();
    socket.on('chat message', function(msg){
        let payload, decryptedPayload;
        
        try {
            payload = decryptDES(msg, localStorage.getItem('password'));
            decryptedPayload = JSON.parse(payload); 
        } catch (error) {
            // Don't continue processing if cannot decrypt
            return console.log('Undecrytable message detected:', msg);
        }
        
        let {sender, msg: message} = decryptedPayload;

        // Build new chat message entry
        let datetime = new Date().toLocaleString().split(', ').join(' ');
        let newMsg = $('<li></li>');
        let msgContainer = $('<div class="msgContainer" onclick=swap(this)></div');
        msgContainer.append($('<span class="timestamp"></span>').text(`[${datetime}]`)); 
        msgContainer.append($('<span class="nickname"></span>').text(`${sender}:`).append('&nbsp;'));
        if (message.startsWith('data:image')) {
            let plain = $('<span class="plain"></span>');
            plain.append($('<img class="chatimg" src="' + message + '"/>'));
            msgContainer.append(plain);
        } else {
            msgContainer.append($('<span class="plain"></span>').text(`${message}`));
        }
        msgContainer.append($('<span class="cipher hidden"></span>').text(msg));
        newMsg.append(msgContainer);
        $('#messages').append(newMsg);
        
        // Scroll to bottom when new message arrives
        $('body, html').animate({
            scrollTop: $('#messages li:last-child').offset().top + 'px'
        }, 0);
    });  
});

function swap(e) {
    // console.log(e);
    // console.log($(e).children());
    if ($(e).children('.plain').hasClass('hidden')) {
        $(e).children('.plain').removeClass('hidden');
        $(e).children('.cipher').addClass('hidden');
    } else {
        $(e).children('.plain').addClass('hidden');
        $(e).children('.cipher').removeClass('hidden');
    }
}