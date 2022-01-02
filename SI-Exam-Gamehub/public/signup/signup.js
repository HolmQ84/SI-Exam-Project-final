
function signup() {

    const username = document.getElementById("username").value;
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const phonenumber = document.getElementById("phonenumber").value;
    const gender = document.getElementById("gender").value;
    const birthdate = document.getElementById("birthdate").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch('/auth/register', {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, firstname, lastname, phonenumber, gender, birthdate, email, password })
    }).then(response => response.json())
      .then(response => {
          console.log(response);
        })
        .catch(reason => console.log(reason))
}