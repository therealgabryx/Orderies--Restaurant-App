
function checkLogin() {
    username = document.getElementById('username')
    password = document.getElementById('password')

    if ((username.value == 'admin') && (password.value == 'admin')) {   
        alert('aight')
        // next function
    } 
    else {
        document.getElementById('feedback').innerText = 'Invalid login.'
    }
} 