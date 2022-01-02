package si.exam.gameservice.Model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int game_id;
    private String name;
    private String picture_url;
    private String developers;
    private String genre;
    private String platform;
    private String release_date;
    private String resume;
    private String type;
    private long storeDate;
}
