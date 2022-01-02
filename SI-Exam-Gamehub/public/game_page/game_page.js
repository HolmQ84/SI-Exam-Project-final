const urlArray = window.location.href.split("/");
const gameID = urlArray[urlArray.length - 1];


(() => {
    fetch('/dbCalls/game')
        .then(game => game.json())
        .then(games => {
            $('.games_container').append(
                '<div class="single_game">' +
                '<table style="width: 100%"><tr><td><h1 style="text-align: center;padding: 4%">' + games.data[0].name + '</h1>' +
                '<table class="inner_table"><tr><td class="inner_table_left"><p>Genre</p></td><td class="inner_table_right"><p>' + games.data[0].genre + '</p></td></tr>' +
                '<tr><td class="inner_table_left"><p>Release Date</p></td><td class="inner_table_right"><p>' + games.data[0].release_date + '</p></td></tr>' +
                '<tr><td class="inner_table_left"><p>Platform</p></td><td class="inner_table_right"><p>' + games.data[0].platform + '</p></td></tr>' +
                '<tr><td class="inner_table_left"><p>Overall Score</p></td><td class="inner_table_right"><p id="game_score"></p></td></tr>' +
                '<tr><td class="inner_table_left"><p>Number of reviews</p></td><td class="inner_table_right"><p id="game_review_count"></p></td></tr></table></td>' +
                '<td style="width: 25%;">' +
                '<img id="current_image" src="' + games.data[0].picture_url + '" alt="image"></td>' +
                '</tr></table>' +
                '<div class="resume">Resume</div>' +
                '<div class="resume_text">' + games.data[0].resume + '</div>');
            if (games.data[0].score !== null) {
                $('#game_score').append(games.data[0].score + ' / 10');
                $('#game_review_count').append(games.data[0].reviews + ' user reviews');
            } else {
                $('#game_score').append('N/A');
                $('#game_review_count').append('No reviews yet..');
            }
        });
})();

(() => {
    fetch('/dbCalls/reviews/')
        .then(review => review.json())
        .then(reviews => {
            if (reviews.data.length !== 0) {
                for (let i = 0; i < reviews.data.length; i++) {
                    $('#review_adder').append
                    (
                        '<tr>' +
                        '<td>' + reviews.data[i].username + '</td>' +
                        '<td>' + reviews.data[i].comment + '</td>' +
                        '<td>' + reviews.data[i].score + ' / 10</td>' +
                        '</td>'
                    );
                }
            } else {
                $('.no_review').append
                (
                    '<h4>No reviews yet.. Be the first!</h4>'
                );
            }
        });
})();

(() => {
    fetch('/getSessionCookie')
        .then(result => result.json())
        .then(session_cookie => {
            //checks if session has a email(if person is logged in.)
            if (session_cookie.user_level !== undefined) {
                $('#game_reviews').append('<div class="table_div">\n' +
                    '        <h3>Create a review for this game</h3>\n' +
                    '        <p>Comments</p>\n' +
                    '        <textarea name="comment" id="comment" rows="10"></textarea>\n' +
                    '        <p>Score</p>\n' +
                    '        <label for="score">\n' +
                    '        <select id="score" name="score">\n' +
                    '            <option value="1">1</option>\n' +
                    '            <option value="2">2</option>\n' +
                    '            <option value="3">3</option>\n' +
                    '            <option value="4">4</option>\n' +
                    '            <option value="5">5</option>\n' +
                    '            <option value="6">6</option>\n' +
                    '            <option value="7">7</option>\n' +
                    '            <option value="8">8</option>\n' +
                    '            <option value="9">9</option>\n' +
                    '            <option value="10">10</option>\n' +
                    '        </select> / 10\n' +
                    '        </label>\n' +
                    '        <br>\n' +
                    '        <div class="buttons">\n' +
                    '            <button id="review_submit" type="submit" onclick="postReview()">Submit Review</button>\n' +
                    '        </div>\n' +
                    '    </div>')
            } else {
                $('#game_reviews').append('<div class="table_div">\n' +
                    '        <h3>Create a review for this game</h3>\n' +
                    '        <p>You must be <a href="/login" id="login_link">logged in</a> to create a review.</p>\n' +
                    '</div>')
            }
        })
        .catch(error => {
                console.log(error);
            }
        )
})();

(() => {
   $.get("/getSessionCookie", (response) =>{
       console.log(response);
   });
})();

function postReview() {
    const score = document.getElementById('score').value;
    const comment = document.getElementById('comment').value;

    fetch('/reviews', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({score, comment})
    })
        .then(response => response.json())
        .then(response => {
            if (response.data === 'Success') {
                window.location.href = "/games/" + gameID;
            } else {
                alert('Something went wrong!');
            }
        })
        .catch(reason => console.log(reason));
}