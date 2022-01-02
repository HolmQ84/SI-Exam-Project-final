package si.exam.gameinfo.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class GameInfoDTO {
    private int game_id;
    private String name;
    private String picture_url;
    private String developers;
    private String genre;
    private String platform;
    private String release_date;
    private String resume;
    private List<ReviewDTO> reviews;

    public GameInfoDTO(int game_id, String name, String picture_url, String developers, String genre, String platform, String release_date, String resume) {
        this.game_id = game_id;
        this.name = name;
        this.picture_url = picture_url;
        this.developers = developers;
        this.genre = genre;
        this.platform = platform;
        this.release_date = release_date;
        this.resume = resume;
    }
}
