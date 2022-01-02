package si.exam.gameinfo.Controller;

import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import si.exam.gameinfo.Client.ReviewClient;
import si.exam.gameinfo.Model.ReviewDTO;
import si.exam.gameinfo.Service.JsonModelConverter;
import si.exam.gameinfo.Service.KafkaSender;

import java.util.List;

@RequestMapping("/reviews")
@RestController
public class ReviewController {

    JsonModelConverter converter = new JsonModelConverter();

    @Autowired
    ReviewClient reviewClient;

    @Autowired
    KafkaSender kafkaSender;

    @GetMapping("/")
    public List<ReviewDTO> getAllReviews() {
        return reviewClient.getAllReviews();
    }

    @GetMapping("/{reviewId}")
    public ReviewDTO getReviewById(@PathVariable int reviewId) {
        return reviewClient.getReviewById(reviewId);
    }

    @PostMapping("/")
    public ReviewDTO createReview(@RequestBody ReviewDTO reviewDTO) {
        ReviewDTO createdReview = reviewClient.createReview(reviewDTO);
        JSONObject object = converter.reviewToObject(createdReview);
        object.put("type", "create");
        kafkaSender.sendReviewTopic(object);
        return createdReview;
    }

    @PutMapping("/{reviewId}")
    public ReviewDTO updateReview(@RequestBody ReviewDTO reviewDTO, @PathVariable int reviewId) {
        reviewDTO.setReviewId(reviewId);
        System.out.println(reviewDTO);
        ReviewDTO updatedReview = reviewClient.updateReview(reviewDTO);
        JSONObject object = converter.reviewToObject(updatedReview);
        object.put("type", "update");
        kafkaSender.sendReviewTopic(object);
        return updatedReview;
    }

    @DeleteMapping("/{reviewId}")
    public String deleteReview(@PathVariable int reviewId) {
        ReviewDTO reviewDTO = reviewClient.getReviewById(reviewId);
        JSONObject object = converter.reviewToObject(reviewDTO);
        object.put("type", "delete");
        kafkaSender.sendReviewTopic(object);
        return reviewClient.deleteReview(reviewId);
    }

    @GetMapping("/reviewsByUser/{userId}")
    public List<ReviewDTO> getAllReviewsByUserId(@PathVariable int userId) {
        return reviewClient.getAllReviewsByUserId(userId);
    }

    @GetMapping("/reviewsByGame/{gameId}")
    public List<ReviewDTO> getAllReviewsBygameId(@PathVariable int gameId) {
        return reviewClient.getAllReviewsByGameId(gameId);
    }

    @GetMapping("favicon.ico")
    @ResponseBody
    void returnNoFavicon() {
    }
}
