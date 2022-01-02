package si.exam.monitor.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import si.exam.monitor.Model.Review;
import si.exam.monitor.Repository.ReviewRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository repo;

    @Override
    public List<Review> getReviews() {
        return this.repo.findAll();
    }

    @Override
    public String createReview(Review review) {
        return this.repo.save(review).getId();
    }

    @Override
    public String updateReview(Review review) {
        Optional<Review> updateReview = this.repo.findById(review.getId());
        if (updateReview.isPresent()) {
            Review current = updateReview.get();
            current.setReviewId(review.getReviewId());
            current.setGameId(review.getGameId());
            current.setUserId(review.getUserId());
            current.setVisualScore(review.getVisualScore());
            current.setGameplayScore(review.getGameplayScore());
            current.setSoundScore(review.getSoundScore());
            current.setComment(review.getComment());
            current.setCreatedTimestamp(review.getUpdatedTimestamp());
            current.setUpdatedTimestamp(review.getUpdatedTimestamp());
            return this.repo.save(current).getId();
        }
        return null;
    }

    @Override
    public void deleteReview(String reviewId) {
        this.repo.deleteById(reviewId);
    }
}
