package si.exam.gameinfo.Controller;

import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import si.exam.gameinfo.Client.GameClient;
import si.exam.gameinfo.Model.GameDTO;
import si.exam.gameinfo.Model.GameInfoDTO;
import si.exam.gameinfo.Service.JsonModelConverter;
import si.exam.gameinfo.Service.KafkaSender;
import si.exam.gameinfo.Service.ModelConverter;

import java.util.List;

@RequestMapping("/games")
@RestController
public class GamesController {

    @Autowired
    GameClient gameClient;

    @Autowired
    KafkaSender kafkaSender;

    JsonModelConverter converter = new JsonModelConverter();
    ModelConverter mc = new ModelConverter();

    @GetMapping("/")
    public List<GameInfoDTO> getAllGames() {
        List<GameDTO> gameDTOS = converter.convertJsonToListOfGameDTO(gameClient.getAllGames());
        return mc.convertFromGameDTOToGameInfoDTO(gameDTOS);
    }

    @GetMapping("/{id}")
    public GameInfoDTO getGameById(@PathVariable int id) {
        GameDTO game = converter.convertGameDTOToModel(gameClient.getGameById(id));
        return mc.convertFromGameDTOToGameInfoDTO(game);
    }

    @GetMapping("/search/{string}")
    public List<GameInfoDTO> getAllGamesBySearch(@PathVariable String string) {
        List<GameDTO> gameDTOS = converter.convertJsonToListOfGameDTO(gameClient.getGamesBySearch(string));
        return mc.convertFromGameDTOToGameInfoDTO(gameDTOS);
    }

    @PostMapping("/")
    public String createGame(@RequestBody JSONObject jsonObject) {
        jsonObject.put("type", "create");
        String message = gameClient.createGame(jsonObject);
        jsonObject.put("game_id", message.substring(11, 13));
        if (!message.contains("403 Forbidden")) {
            kafkaSender.sendGameTopic(jsonObject.toString());
        }
        return message;
    }

    @PutMapping("/{id}")
    public String updateGame(@RequestBody JSONObject gameDTO, @PathVariable int id) {
        String message = gameClient.updateGame(gameDTO, id);
        gameDTO.put("game_id", id);
        gameDTO.put("type", "update");
        kafkaSender.sendGameTopic(gameDTO.toString());
        return message;
    }

    @DeleteMapping("/{id}")
    public String deleteGame(@PathVariable int id) {
        JSONObject deletedGame = gameClient.getGameById(id);
        deletedGame.put("type", "delete");
        String message = gameClient.deleteGame(id);
        try {
            kafkaSender.sendGameTopic(deletedGame.toString());
        } catch (NullPointerException e) {
            return "No game found with ID: "+ id;
        }
        return message;
    }
}
