package Dao;

import Model.gRPCReview;
import si.stubs.review.CreateReview;
import si.stubs.review.UpdateReview;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

public class ReviewDao {

    @PersistenceContext
    EntityManagerFactory emf = Persistence.createEntityManagerFactory("grpc-reviews");
    EntityManager em = emf.createEntityManager();

    public gRPCReview findById(int reviewId){
        gRPCReview review = this.em.find(gRPCReview.class, reviewId);
        if(review == null) {
            throw new NoSuchElementException("404 - No data found with Id: "+reviewId);
        }
        return review;
    }

    public List<gRPCReview> findAllReviews() {
        return (List<gRPCReview>) this.em.createQuery("SELECT x FROM " + gRPCReview.class.getSimpleName() + " x").getResultList();
    }

    @Transactional
    public gRPCReview createNewReview(CreateReview review) {
        Date date = new Date();
        String query = "INSERT INTO grpcreview (gameId, userId, visualScore, gameplayScore, soundScore, comment, createdTimestamp) VALUES (?,?,?,?,?,?,?)";
        EntityTransaction et = em.getTransaction();
        et.begin();
        em.createNativeQuery(query)
                .setParameter(1, review.getGameId())
                .setParameter(2, review.getUserId())
                .setParameter(3, review.getVisualScore())
                .setParameter(4, review.getGameplayScore())
                .setParameter(5, review.getSoundScore())
                .setParameter(6, review.getComment())
                .setParameter(7, date.getTime())
                .executeUpdate();
        et.commit();
        List<Integer> id = (List<Integer>) em.createNativeQuery("SELECT reviewId FROM " + gRPCReview.class.getSimpleName()).getResultList();
        return new gRPCReview(
                id.get(id.size()-1),
                review.getGameId(),
                review.getUserId(),
                review.getVisualScore(),
                review.getGameplayScore(),
                review.getSoundScore(),
                review.getComment(),
                date.getTime()
        );
    }

    public String deleteReview(int reviewId) {
        gRPCReview review = this.em.find(gRPCReview.class, reviewId);
        EntityTransaction et = em.getTransaction();
        et.begin();
        try {
            em.remove(review);
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to delete review with ID: " + reviewId;
        }

        et.commit();
        return "Succesfully deleted review with ID: " + reviewId;
    }

    @Transactional
    public gRPCReview updateReview(UpdateReview review) {
        Date date = new Date();
        EntityTransaction et = em.getTransaction();
        et.begin();
        gRPCReview thisReview = this.em.find(gRPCReview.class, review.getReviewId());
        thisReview.setGameId(review.getGameId());
        thisReview.setUserId(review.getUserId());
        thisReview.setVisualScore(review.getVisualScore());
        thisReview.setGameplayScore(review.getGameplayScore());
        thisReview.setSoundScore(review.getSoundScore());
        thisReview.setComment(review.getComment());
        thisReview.setUpdatedTimestamp(date.getTime());
        em.persist(thisReview);
        et.commit();
        return thisReview;
    }

    public List<gRPCReview> findAllReviewsByUserId(int userId) {
        String query = "SELECT x FROM "+gRPCReview.class.getSimpleName()+" x WHERE x.userId = :id";
        EntityTransaction et = em.getTransaction();
        et.begin();
        List<gRPCReview> reviews = (List<gRPCReview>) em.createQuery(query).setParameter("id", userId).getResultList();
        et.commit();
        return reviews;
    }

    public List<gRPCReview> findAllReviewsByGameId(int gameId) {
        String query = "SELECT x FROM "+gRPCReview.class.getSimpleName()+" x WHERE x.gameId = :id";
        EntityTransaction et = em.getTransaction();
        et.begin();
        List<gRPCReview> reviews = (List<gRPCReview>) em.createQuery(query).setParameter("id", gameId).getResultList();
        et.commit();
        return reviews;
    }
}
