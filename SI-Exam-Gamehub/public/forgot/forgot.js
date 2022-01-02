
function storeKey() {
    const email = document.getElementById("email").value;

    fetch('/auth/setResetKey', {
        method: 'PATCH',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email })
    })
        .then(response => response.json())
        .then(response => {
            if (response.data === 'Creating reset key failed.') {
                $('#message').empty().append('<p>This email is not registered.</p>');
            } else if (response.data === 'Key successfully stored.') {
                $('#message').empty().append('<p>Email sent to you.</p>');
            }
        })
        .catch(reason => console.log(reason))
}