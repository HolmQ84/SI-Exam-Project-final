package si.exam.gameinfo.Client;

import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import org.springframework.stereotype.Service;
import si.exam.gameinfo.Model.ReviewDTO;
import si.stubs.review.*;
import si.stubs.review.ReviewServiceGrpc.ReviewServiceBlockingStub;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Logger;

@Service
public class ReviewClient {

    private static final Logger logger = Logger.getLogger(ReviewClient.class.getName());

    private final ReviewServiceBlockingStub stub;

    public ReviewClient() {
        logger.info("Establishing connection to Server..");
        ManagedChannel channel = ManagedChannelBuilder.forTarget("localhost:8084")
                .usePlaintext()
                .build();
        this.stub = ReviewServiceGrpc.newBlockingStub(channel);
        logger.info("Connection to Server successful.");
    }

    // Create a request to the Review server, send it and get response from the predefined service there
    public ReviewDTO getReviewById(int id) {
        logger.info("getReviewById(id) called.");
        ReviewId reviewRequest = ReviewId.newBuilder().setReviewId(id).build();
        Review reviewResponse = stub.getReviewById(reviewRequest);

        ReviewDTO reviewDTO = new ReviewDTO();
        reviewDTO.setReviewId(reviewResponse.getReviewId());
        reviewDTO.setGameId(reviewResponse.getGameId());
        reviewDTO.setUserId(reviewResponse.getUserId());
        reviewDTO.setVisualScore(reviewResponse.getVisualScore());
        reviewDTO.setGameplayScore(reviewResponse.getGameplayScore());
        reviewDTO.setSoundScore(reviewResponse.getSoundScore());
        reviewDTO.setComment(reviewResponse.getComment());
        reviewDTO.setCreatedTimestamp(reviewResponse.getCreatedTimestamp());
        reviewDTO.setUpdatedTimestamp(reviewResponse.getUpdatedTimestamp());

        return reviewDTO;
    }

    public List<ReviewDTO> getAllReviews() {
        logger.info("getAllReviews() called.");
        Iterator<Review> reviewResponse = stub.getAllReviews(null);
        ArrayList<ReviewDTO> allReviews = new ArrayList<>();

        while (reviewResponse.hasNext()) {
            Review review = reviewResponse.next();
            ReviewDTO reviewDTO = new ReviewDTO(
                    review.getReviewId(),
                    review.getGameId(),
                    review.getUserId(),
                    review.getVisualScore(),
                    review.getGameplayScore(),
                    review.getSoundScore(),
                    review.getComment(),
                    review.getCreatedTimestamp(),
                    review.getUpdatedTimestamp()
            );
            allReviews.add(reviewDTO);
        }
        return allReviews;
    }

    public ReviewDTO createReview(ReviewDTO reviewDTO) {
        logger.info("createReview(reviewDTO) called.");
        Review reviewResponse = stub.createReview(
                CreateReview.newBuilder()
                        .setGameId(reviewDTO.getGameId())
                        .setUserId(reviewDTO.getUserId())
                        .setVisualScore(reviewDTO.getVisualScore())
                        .setGameplayScore(reviewDTO.getGameplayScore())
                        .setSoundScore(reviewDTO.getSoundScore())
                        .setComment(reviewDTO.getComment())
                        .build()
        );
        reviewDTO.setReviewId(reviewResponse.getReviewId());
        reviewDTO.setCreatedTimestamp(reviewResponse.getCreatedTimestamp());
        logger.info("Created new Review: "+reviewDTO);
        return reviewDTO;
    }

    public ReviewDTO updateReview(ReviewDTO reviewDTO) {
        Review reviewResponse = stub.updateReview(
                Review.newBuilder()
                        .setReviewId(reviewDTO.getReviewId())
                        .setGameId(reviewDTO.getGameId())
                        .setUserId(reviewDTO.getUserId())
                        .setVisualScore(reviewDTO.getVisualScore())
                        .setGameplayScore(reviewDTO.getGameplayScore())
                        .setSoundScore(reviewDTO.getSoundScore())
                        .setComment(reviewDTO.getComment())
                        .setCreatedTimestamp(reviewDTO.getCreatedTimestamp())
                        .setUpdatedTimestamp(reviewDTO.getUpdatedTimestamp())
                        .build()
        );
        logger.info("Updated existing review with ID: "+reviewResponse.getReviewId());
        reviewDTO.setCreatedTimestamp(reviewResponse.getCreatedTimestamp());
        reviewDTO.setUpdatedTimestamp(reviewResponse.getUpdatedTimestamp());
        return reviewDTO;
    }

    public String deleteReview(int id) {
        DeleteStatus status = stub.deleteReview(ReviewId.newBuilder().setReviewId(id).build());
        return status.getMessage();
    }

    public List<ReviewDTO> getAllReviewsByUserId(int id) {
        logger.info("getAllReviewsByUserId(userId) called.");
        UserId userId = UserId.newBuilder().setUserId(id).build();
        Iterator<Review> reviewResponse = stub.getAllReviewsByUserId(userId);
        List<ReviewDTO> allReviews = new ArrayList<>();
        while (reviewResponse.hasNext()) {
            Review review = reviewResponse.next();
            ReviewDTO reviewDTO = new ReviewDTO(
                    review.getReviewId(),
                    review.getGameId(),
                    review.getUserId(),
                    review.getVisualScore(),
                    review.getGameplayScore(),
                    review.getSoundScore(),
                    review.getComment(),
                    review.getCreatedTimestamp(),
                    review.getUpdatedTimestamp()
            );
            allReviews.add(reviewDTO);
        }
        return allReviews;
    }

    public List<ReviewDTO> getAllReviewsByGameId(int id) {
        logger.info("getAllReviewsByGameId(userId) called.");
        GameId gameId = GameId.newBuilder().setGameId(id).build();
        Iterator<Review> reviewResponse = stub.getAllReviewsByGameId(gameId);
        List<ReviewDTO> allReviews = new ArrayList<>();
        while (reviewResponse.hasNext()) {
            Review review = reviewResponse.next();
            ReviewDTO reviewDTO = new ReviewDTO(
                    review.getReviewId(),
                    review.getGameId(),
                    review.getUserId(),
                    review.getVisualScore(),
                    review.getGameplayScore(),
                    review.getSoundScore(),
                    review.getComment(),
                    review.getCreatedTimestamp(),
                    review.getUpdatedTimestamp()
            );
            allReviews.add(reviewDTO);
        }
        return allReviews;
    }
}
