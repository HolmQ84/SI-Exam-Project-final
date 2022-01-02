
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch('/auth/login', {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(response => {
            if (response.data === 'Incorrect Password/Email.') {
                $('#login_message').empty().append('<p>Wrong Email or Password.</p>');
            } else if (response.data === 'Success.') {
                window.location.href = '/';
            }
        })
        .catch(reason => console.log(reason))
}

document.onkeypress = enter;
function enter(e) {
    if (e.which === 13) {
        login();
    }
}
