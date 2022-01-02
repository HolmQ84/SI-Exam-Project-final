package si.exam.monitor.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import si.exam.monitor.Model.Review;
import si.exam.monitor.Repository.ReviewRepository;
import si.exam.monitor.Service.ReviewService;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @GetMapping("/allReviews")
    public List<Review> getAllReviews() {
        return reviewService.getReviews();
    }

    @GetMapping("/createdReviews")
    public List<Review> getAllCreatedReviews() {
        List<Review> reviews = reviewService.getReviews();
        List<Review> createdReviews = new ArrayList<>();
        for (Review current: reviews) {
            if (current.getType().equals("create")) {
                createdReviews.add(current);
            }
        }
        return createdReviews;
    }

    @GetMapping("/updatedReviews")
    public List<Review> getAllUpdatedReviews() {
        List<Review> reviews = reviewService.getReviews();
        List<Review> createdReviews = new ArrayList<>();
        for (Review current: reviews) {
            if (current.getType().equals("update")) {
                createdReviews.add(current);
            }
        }
        return createdReviews;
    }

    @GetMapping("/deletedReviews")
    public List<Review> getAllDeletedReviews() {
        List<Review> reviews = reviewService.getReviews();
        List<Review> createdReviews = new ArrayList<>();
        for (Review current: reviews) {
            if (current.getType().equals("delete")) {
                createdReviews.add(current);
            }
        }
        return createdReviews;
    }
}
