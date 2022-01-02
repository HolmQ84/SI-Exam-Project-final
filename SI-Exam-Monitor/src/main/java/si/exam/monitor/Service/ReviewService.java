package si.exam.monitor.Service;

import si.exam.monitor.Model.Review;

import java.util.List;

public interface ReviewService {
    List<Review> getReviews();
    String createReview(Review review);
    String updateReview(Review review);
    void deleteReview(String reviewId);
}
