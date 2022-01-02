const router = require('express').Router();
const mysqlReviewsRead = require('../mySQL/reviews/read');
const mysqlReviewsCreate = require('../mySQL/reviews/create');

// Get all games from DB.
router.get('/dbCalls/reviews/', async (req, res) => {
    const reviews = await mysqlReviewsRead.getAllReviews(req.session.game_id);
    return res.status(200).send({
        data: reviews
    });
});

router.get('/dbCalls/getAllUserReviews', async (req, res) => {
    const reviews = await mysqlReviewsRead.getAllUserReviews(req.session.user_id);
    return res.status(200).send({
        data: reviews
    });
});

// Add review to game.
router.post('/reviews', async (req, res) => {
    const result = await mysqlReviewsCreate.createReview(
        req.body.score,
        req.body.comment,
        req.session.user_id,
        req.session.game_id
    );
    if (result !== undefined) {
        return res.status(200).send({
            data: 'Success'
        })
    } else {
        return res.status(500).send({
            data: 'Something went wrong'
        });
    }
});


module.exports = router;