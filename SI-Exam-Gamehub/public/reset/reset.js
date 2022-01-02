
function resetPassword() {
    const splitUrl = window.location.href.split("/");
    const resetKey = splitUrl[splitUrl.length-1];
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;
    if (password === confirm) {
        fetch('/users/resetpassword/', {
            method: 'PATCH',
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ resetKey, password })
        })
            .then(result => result.json())
            .then(response => {
                if (response.data === 'Success') {
                    // Viser en counter på siden som tæller ned til redirect.
                    let counter = 5;
                    const interval = setInterval(() => {
                        counter--;
                        $('#counter').empty().append(counter);
                        if (counter === 0) {
                            window.location = '/login';
                        }
                    }, 1000);
                    $('#message-container').empty().append('<p>Password successfully changed.</p>' +
                        '<p>Redirecting you to login in '+'<span id="counter">5' +
                        '</span>'+' seconds... or click <a href="/login">here</a></p>');
                } else {
                    $('#message-container').append('<p>Password key doesnt exist.</p>' +
                        '<p>Try retrieving your password <a href="/forgotPassword">again</a></p>');
                }
            })
            .catch(error => console.log('Der opstod en fejl: '+error))
    } else {
        $('#message-container').append('Passwords doesnt match.');
    }

}