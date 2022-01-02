package Service;

import Dao.ReviewDao;
import Model.gRPCReview;
import com.google.protobuf.Empty;
import io.grpc.Status;
import io.grpc.stub.StreamObserver;
import si.stubs.review.*;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ReviewServiceImpl extends ReviewServiceGrpc.ReviewServiceImplBase {

    private static final Logger logger = Logger.getLogger(ReviewServiceImpl.class.getName());

    private final ReviewDao reviewDao = new ReviewDao();

    @Override
    public void getReviewById(ReviewId id, StreamObserver<Review> reviewStreamObserver) {
        int reviewId = (int) id.getReviewId();
        logger.info("getReviewById called with ID: "+reviewId);
        try{
            gRPCReview review = reviewDao.findById(reviewId);
            Review reviewGRpcResponse = Review.newBuilder()
                    .setReviewId(review.getReviewId())
                    .setGameId(review.getGameId())
                    .setUserId(review.getUserId())
                    .setVisualScore(review.getVisualScore())
                    .setGameplayScore(review.getGameplayScore())
                    .setSoundScore(review.getSoundScore())
                    .setComment(review.getComment())
                    .setCreatedTimestamp(review.getCreatedTimestamp())
                    .setUpdatedTimestamp((review.getUpdatedTimestamp() == null) ? 0 : review.getUpdatedTimestamp())
                    .build();
            reviewStreamObserver.onNext(reviewGRpcResponse);
            reviewStreamObserver.onCompleted();
        }catch (NoSuchElementException e){
            logger.log(Level.INFO, "No Review found with ReviewId: "+reviewId);
            reviewStreamObserver.onError(Status.NOT_FOUND.asRuntimeException());
        }
    }

    @Override
    public void getAllReviews(Empty request, StreamObserver<Review> reviewStreamObserver) {
        List<gRPCReview> reviews = reviewDao.findAllReviews();
        logger.info("Get all reviews called.");
        for (gRPCReview current: reviews) {
            Review reviewResponse = Review.newBuilder()
                    .setReviewId(current.getReviewId())
                    .setGameId(current.getGameId())
                    .setUserId(current.getUserId())
                    .setVisualScore(current.getVisualScore())
                    .setGameplayScore(current.getGameplayScore())
                    .setSoundScore(current.getSoundScore())
                    .setComment(current.getComment())
                    .setCreatedTimestamp(current.getCreatedTimestamp())
                    .setUpdatedTimestamp((current.getUpdatedTimestamp() == null) ? 0 : current.getUpdatedTimestamp())
                    .build();
            reviewStreamObserver.onNext(reviewResponse);
        }
        reviewStreamObserver.onCompleted();
    }

    @Override
    public void createReview(CreateReview review, StreamObserver<Review> responseObserver) {
        gRPCReview createdReview = reviewDao.createNewReview(review);
        logger.info("Created new Review: "+ createdReview);
        Review reviewResponse = Review.newBuilder()
                .setReviewId(createdReview.getReviewId())
                .setGameId(createdReview.getGameId())
                .setUserId(createdReview.getUserId())
                .setVisualScore(createdReview.getVisualScore())
                .setGameplayScore(createdReview.getGameplayScore())
                .setSoundScore(createdReview.getSoundScore())
                .setComment(createdReview.getComment())
                .setCreatedTimestamp(createdReview.getCreatedTimestamp())
                .build();
        responseObserver.onNext(reviewResponse);
        responseObserver.onCompleted();
    }

    @Override
    public void deleteReview(ReviewId request, StreamObserver<DeleteStatus> responseObserver) {
        int reviewId = (int) request.getReviewId();
        String deleted = reviewDao.deleteReview(reviewId);
        logger.info(deleted);
        DeleteStatus deleteStatus = DeleteStatus.newBuilder().setMessage(deleted).build();
        responseObserver.onNext(deleteStatus);
        responseObserver.onCompleted();
    }

    @Override
    public void updateReview(Review review, StreamObserver<Review> responseObserver) {
        UpdateReview updatedReview = UpdateReview.newBuilder()
                .setReviewId(review.getReviewId())
                .setGameId(review.getGameId())
                .setUserId(review.getUserId())
                .setVisualScore(review.getVisualScore())
                .setGameplayScore(review.getGameplayScore())
                .setSoundScore(review.getSoundScore())
                .setComment(review.getComment())
                .build();
        gRPCReview updated = reviewDao.updateReview(updatedReview);
        logger.info("Review updated: "+updated);
        Review newReview = Review.newBuilder()
                .setReviewId(updated.getReviewId())
                .setGameId(updated.getGameId())
                .setUserId(updated.getUserId())
                .setVisualScore(updated.getVisualScore())
                .setGameplayScore(updated.getGameplayScore())
                .setSoundScore(updated.getSoundScore())
                .setComment(updated.getComment())
                .setCreatedTimestamp(updated.getCreatedTimestamp())
                .setUpdatedTimestamp(updated.getUpdatedTimestamp())
                .build();
        responseObserver.onNext(newReview);
        responseObserver.onCompleted();
    }

    @Override
    public void getAllReviewsByUserId(UserId id, StreamObserver<Review> reviewStreamObserver) {
        List<gRPCReview> reviews = reviewDao.findAllReviewsByUserId(id.getUserId());
        logger.info("Get all reviews by user id called.");
        for (gRPCReview current: reviews) {
            Review reviewResponse = Review.newBuilder()
                    .setReviewId(current.getReviewId())
                    .setGameId(current.getGameId())
                    .setUserId(current.getUserId())
                    .setVisualScore(current.getVisualScore())
                    .setGameplayScore(current.getGameplayScore())
                    .setSoundScore(current.getSoundScore())
                    .setComment(current.getComment())
                    .setCreatedTimestamp(current.getCreatedTimestamp())
                    .setUpdatedTimestamp((current.getUpdatedTimestamp() == null) ? 0 : current.getUpdatedTimestamp())
                    .build();
            reviewStreamObserver.onNext(reviewResponse);
        }
        reviewStreamObserver.onCompleted();
    }

    @Override
    public void getAllReviewsByGameId(GameId id, StreamObserver<Review> reviewStreamObserver) {
        List<gRPCReview> reviews = reviewDao.findAllReviewsByGameId(id.getGameId());
        logger.info("Get all reviews by game id called.");
        for (gRPCReview current: reviews) {
            Review reviewResponse = Review.newBuilder()
                    .setReviewId(current.getReviewId())
                    .setGameId(current.getGameId())
                    .setUserId(current.getUserId())
                    .setVisualScore(current.getVisualScore())
                    .setGameplayScore(current.getGameplayScore())
                    .setSoundScore(current.getSoundScore())
                    .setComment(current.getComment())
                    .setCreatedTimestamp(current.getCreatedTimestamp())
                    .setUpdatedTimestamp((current.getUpdatedTimestamp() == null) ? 0 : current.getUpdatedTimestamp())
                    .build();
            reviewStreamObserver.onNext(reviewResponse);
        }
        reviewStreamObserver.onCompleted();
    }
}
