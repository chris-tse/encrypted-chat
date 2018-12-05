//reference 

$('#login').submit(e => {
    e.preventDefault();
    
    let nickname = $('#nickname').val();
    let pw = $('#password').val();
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('password', pw);
    window.location.href = '/chat';
    
    // let hashedPW = CryptoJS.SHA512(pw).toString();
    
    // axios.post('/login', {
    //     nickname,
    //     hashedPW
    // })
    // .then(function (response) {
    //     let {payload} = response.data;
    //     let decryptedPayload = JSON.parse(decryptDES(payload, pw));

    //     if (decryptedPayload.PW === pw) {
    //         // console.log('same pw');
    //         deleteCookie('nickname');
    //         setCookie('nickname', nickname, 600000); 
    //         setCookie('chatkey', decryptedPayload.chatkey, 600000);
    //     } else {
    //         alert('Password doesn\'t match, potentially unsafe server');
    //     }
    // })
    // .catch(function (error, res) {
    //     console.log(error, res);
    //     $('#password').addClass('is-invalid');
    // });
    
    // $('#password').change(e => {
    //     $('#password').removeClass('is-invalid');
    // })
})