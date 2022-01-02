package si.exam.monitor.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Review {
    @Id
    private String id;
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
}
