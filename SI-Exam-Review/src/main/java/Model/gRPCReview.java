package Model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
@NoArgsConstructor
public class gRPCReview {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int reviewId;
    private int gameId;
    private int userId;
    private int visualScore;
    private int gameplayScore;
    private int soundScore;
    private String comment;
    private long createdTimestamp;
    private Long updatedTimestamp;

    public gRPCReview(int reviewId, int gameId, int userId, int visualScore, int gameplayScore, int soundScore, String comment, Long createdTimestamp) {
        this.reviewId = reviewId;
        this.gameId = gameId;
        this.userId = userId;
        this.visualScore = visualScore;
        this.gameplayScore = gameplayScore;
        this.soundScore = soundScore;
        this.comment = comment;
        this.createdTimestamp = createdTimestamp;
    }

    public gRPCReview(int reviewId, int gameId, int userId, int visualScore, int gameplayScore, int soundScore, String comment, Long createdTimestamp, Long updatedTimestamp) {
        this.reviewId = reviewId;
        this.gameId = gameId;
        this.userId = userId;
        this.visualScore = visualScore;
        this.gameplayScore = gameplayScore;
        this.soundScore = soundScore;
        this.comment = comment;
        this.createdTimestamp = createdTimestamp;
        this.updatedTimestamp = updatedTimestamp;
    }
}
