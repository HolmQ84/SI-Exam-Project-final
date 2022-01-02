function updateUser () {
    console.log('Called update user');

    const username =  document.getElementById('username').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const gender =  document.getElementById('gender').value;
    const birthdate = document.getElementById('birthdate').value;
    const email = document.getElementById('email').value;
    const splitUrl = window.location.href.split("/");
    const userId = splitUrl[splitUrl.length-1];

    fetch('/users/'+userId, {
        method: 'PATCH',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, firstname, lastname, phoneNumber, gender, birthdate, email, userId })
    })
        .then(response => response.json())
        .then(response => {

            if (response.data === 'Success: Userdata updated.') {
                window.location.href = "/users/"+userId;
            } else if (response.data === 'Couldnt find user.') {
                window.location.href = "/update/:id";
            } else {
                window.location.href = '/update/'+userId;
            }
        })
        .catch(reason => console.log(reason))
}

(() => {
    fetch('/getSessionCookie')
        .then(result => result.json())
        .then(session_cookie => {
            if (session_cookie.email !== undefined) {
                console.log(session_cookie.birthdate)
                $('#username').val(session_cookie.username);
                $('#firstname').val(session_cookie.firstname);
                $('#lastname').val(session_cookie.lastname);
                $('#phoneNumber').val(session_cookie.phoneNumber);
                $('#gender').val(session_cookie.gender);
                $('#birthdate').val(session_cookie.birthdate);
                $('#email').val(session_cookie.email);
            }
        })
        .catch(error => {
                console.log(error);
            }
        )
})();