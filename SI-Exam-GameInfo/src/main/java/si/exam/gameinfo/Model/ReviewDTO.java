package si.exam.gameinfo.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDTO {
    private int reviewId;
    private int gameId;
    private int userId;
    private int visualScore;
    private int gameplayScore;
    private int soundScore;
    private String comment;
    private long createdTimestamp;
    private long updatedTimestamp;
}
