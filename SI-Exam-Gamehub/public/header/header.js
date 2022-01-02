(() => {
    fetch('/getSessionCookie')
        .then(result => result.json())
        .then(session_cookie => {
            //checks if session has a email(if person is logged in.)
            if (session_cookie.user_level === undefined) {
                document.getElementById('user_name').append(session_cookie.username);
                $('#user_glyphicon').addClass('glyphicon glyphicon-user').attr("href", "/login");
            } else if (session_cookie.user_level === 'user'|| 'admin') {
                //appends logged in as + username to the navbar.
                $('#user_name').append('<a class="nav-item active navRight nav-link" style="color: #999999; text-decoration: none;">Logged in as: </a> <a class="nav-item active navRight nav-link" ' +
                    'style="color: #ff9900">' + session_cookie.username + '</a>'+ '  ' + '<a class="nav-item active navRight"></a>');
                //changes the glyphicon to logout
                $('#update_user').addClass('glyphicon glyphicon-cog').attr("href", "/update/"+session_cookie.user_id);
                $('#glyphicon').addClass('glyphicon glyphicon-user').attr("href", "/users/"+session_cookie.user_id);
                $('#user_glyphicon').addClass('glyphicon glyphicon-log-out').attr("href", "/signout");
                if (session_cookie.user_level === 'admin') {
                    $('#games').append('<li><a href="/newgame">Create Game</a></li>');
                    $('#reviews').append('<li class="dropdown">\n' +
                        '<a class="dropdown-toggle" data-toggle="dropdown" href="#">Reviews<span class="caret"></span></a>\n' +
                        '<ul class="dropdown-menu dropdown-menu-reviews">\n' +
                        '<li><a href="#">New Review (coming soon)</a></li>\n' +
                        '<li><a href="#">Show My Review (coming soon)</a></li>\n' +
                        '<li><a href="#">Show All Reviews (coming soon)</a></li>\n' +
                        '</ul>\n' +
                        '</li>' +
                        '<li><a href="/users">Users</a></li>')
                }
            }
        })
        .catch(error => {
            console.log(error);
        }
    )
})();
