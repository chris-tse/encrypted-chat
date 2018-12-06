//reference 

$('#login').submit(e => {
    e.preventDefault();
    
    let nickname = $('#nickname').val();
    let pw = $('#password').val();
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('password', pw);
    window.location.href = '/chat';
})