package si.exam.monitor.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Game {
    @Id
    private String id;
    private int game_id;
    private String name;
    private String picture_url;
    private String developers;
    private String genre;
    private String platform;
    private String release_date;
    private String resume;
    private String type;
}
