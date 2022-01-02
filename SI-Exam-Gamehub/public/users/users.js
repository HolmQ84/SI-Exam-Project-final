(() => {
    fetch('/dbCalls/allUsers')
        .then((users) => users.json())
        .then(jsonUsers => {
            $('#user_info').append(
                '<tr id="first_row">' +
                    '<td>Username</td>' +
                    '<td>Firstname</td>' +
                    '<td>Lastname</td>' +
                    '<td>Email</td>' +
                    '<td>Status</td>' +
                    '<td>Options</td>' +
                '</tr>')
            for (let i = 0; i < jsonUsers.data.length; i++){
                $("#user_info").append(
                    '<tr>' +
                        "<td>" + jsonUsers.data[i].username + "</td>" +
                        "<td>" + jsonUsers.data[i].firstname + "</td>" +
                        "<td>" + jsonUsers.data[i].lastname + "</td>" +
                        "<td>" + jsonUsers.data[i].email + '</td>' +
                        "<td>" + jsonUsers.data[i].user_level + '</td>' +
                        '<td>' +
                        '<span class="glyphicon glyphicon-trash" id="delete" onclick="deleteUser('+jsonUsers.data[i].user_id+')"></span>' +
                        '<a href="/users/update/'+jsonUsers.data[i].user_id+'"><span class="glyphicon glyphicon-cog" id="update" ></span></a>' +
                        '<span class="glyphicon glyphicon-upload" id="promote" onclick="promoteUser('+jsonUsers.data[i].user_id+')"></span>' +
                        '</td>' +
                    '</tr>');
            }
        });
})();

function deleteUser(user_id) {
    if (confirm('Are you sure you want to delete this user?')) {
        fetch('/users/' + user_id, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(res => {
                if (res.data === 'User successfully deleted.') {
                    window.location.href = '/users';
                } else {
                    alert('Something went wrong!\nTry again later.');
                }
            })
    }
}

function promoteUser(user_id) {
    if (confirm('Are you sure you want to promote this user to administrator?')) {
        fetch('/users/promote/' + user_id, {
            method: 'PATCH'
        })
            .then(response => response.json())
            .then(res => {
                if (res.data === 'User promoted to administrator.') {
                    window.location.href = '/users';
                } else if (res.data === 'User already administrator.') {
                    alert('User is already administrator!');
                }
            })
    }
}