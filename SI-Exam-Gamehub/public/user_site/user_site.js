(() => {
    fetch('/getSessionCookie')
        .then(result => result.json())
        .then(session_cookie => {
            if (session_cookie.email !== undefined) {
                //appends logged in as + username to the navbar.
                $('#user_details').append(
                    '<img src="../images/userlogoFallback.png">' +
                    '<h2>'+session_cookie.username+'</h2>' +
                    '<table class="user_info_table">\n' +
                    '        <tr>\n' +
                    '            <td class="lefty">Firstname</td>\n' +
                    '            <td class="righty">'+session_cookie.firstname+'</td>\n' +
                    '        </tr>\n' +
                    '        <tr>\n' +
                    '            <td class="lefty">Lastname</td>\n' +
                    '            <td class="righty">'+session_cookie.lastname+'</td>\n' +
                    '        </tr>\n' +
                    '        <tr>\n' +
                    '            <td class="lefty">Phone Number</td>\n' +
                    '            <td class="righty">'+session_cookie.phoneNumber+'</td>\n' +
                    '        </tr>\n' +
                    '        <tr>\n' +
                    '            <td class="lefty">Gender</td>\n' +
                    '            <td class="righty">'+session_cookie.gender+'</td>\n' +
                    '        </tr>\n' +
                    '        <tr>\n' +
                    '            <td class="lefty">Birthdate</td>\n' +
                    '            <td class="righty">'+session_cookie.birthdate+'</td>\n' +
                    '        </tr>\n' +
                    '        <tr>\n' +
                    '            <td class="lefty">Email</td>\n' +
                    '            <td class="righty">'+session_cookie.email+'</td>\n' +
                    '        </tr>\n' +
                    '    </table>'
                )
            }
        })
        .catch(error => {
                console.log(error);
            }
        )
    fetch('/dbCalls/getAllUserReviews')
        .then(games => games.json())
        .then(jsonGames => {
            $('#user_reviews').append('<h4>Reviews made by you</h4>');
            if (jsonGames.data.length > 0) {
                console.log(jsonGames.data)
                $('#user_reviews').append('' +
                    '    <table class="user_review_table">\n' +
                    '        <thead>\n' +
                    '        <tr>\n' +
                    '            <th style="width: 20%">Name</th>\n' +
                    '            <th style="width: 60%">Comment</th>\n' +
                    '            <th style="width: 20%">Score</th>\n' +
                    '        </tr>\n' +
                    '        </thead>\n' +
                    '    </table>');
                for (let i = 0; i< jsonGames.data.length; i++) {
                    $('.user_review_table').append('' +
                        '<tr>' +
                        '<td>'+jsonGames.data[i].name+'</td>' +
                        '<td>'+jsonGames.data[i].comment+'</td>' +
                        '<td>'+jsonGames.data[i].score+' / 10</td>' +
                        '</tr>');
                }
            } else {
                $('.user_info_container').append('<p>No reviews made yet.</p>');
            }
        });
})();