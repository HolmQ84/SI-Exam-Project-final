package si.exam.gameservice.Model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
public class Review {
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
    private long updatedTimestamp;
    private String type;
    private long storeDate;
}
