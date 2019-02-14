$('#login').submit(e => {
    e.preventDefault();
    
    // Store nickname and password in localStorage to reference from chat page
    // No auth is done in this implementation
    let nickname = $('#nickname').val();
    let pw = $('#password').val();
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('password', pw);
    window.location.href = '/chat';
})