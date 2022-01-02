(() => {
    fetch('/dbCalls/allGames')
        .then(games => games.json())
        .then(jsonGames => {
            for (let i = 0;i<jsonGames.data.length;i++) {
                if (jsonGames.data[i].score !== null) {
                    $('.games_container').append('<a href="/games/'+jsonGames.data[i].game_id+'"><div class="review_container">' +
                        '<h1>' + jsonGames.data[i].name + '</h1>' +
                        '<p>' + jsonGames.data[i].genre + ' | ' + jsonGames.data[i].release_date + '</p>' +
                        '<p>' + jsonGames.data[i].score + ' / 10 - based on '+jsonGames.data[i].reviews+' user reviews</p>' +
                        '<div class="review_img_container">' +
                        '<img src="' + jsonGames.data[i].picture_url + '" alt="image" >' +
                        '</div></div></a>');
                } else {
                    $('.games_container').append('<a href="/games/'+jsonGames.data[i].game_id+'"><div class="review_container">' +
                        ' <h1>' + jsonGames.data[i].name + '</h1>' +
                        '<p>' + jsonGames.data[i].genre + ' | ' + jsonGames.data[i].release_date + '</p>' +
                        '<p>No score yet..</p>' +
                        '<div class="review_img_container">' +
                        '<img src="' + jsonGames.data[i].picture_url + '" alt="image" >' +
                        '</div></div></a>');
                }
            }
        });
})();