package si.exam.gameinfo.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameDTO {
    private int game_id;
    private String name;
    private String picture_url;
    private String developers;
    private String genre;
    private String platform;
    private String release_date;
    private String resume;
}
