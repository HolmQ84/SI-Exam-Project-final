package si.exam.monitor.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import si.exam.monitor.Model.Game;
import si.exam.monitor.Service.GameService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/monitor/games")
public class GameController {

    @Autowired
    GameService gameService;

    @GetMapping("/allGames")
    public List<Game> getAllGames() {
        return gameService.getGames();
    }

    @GetMapping("/createdGames")
    public List<Game> getAllCreatedGames() {
        List<Game> games = gameService.getGames();
        List<Game> createdGames = new ArrayList<>();
        for (Game current: games) {
            if (current.getType().equals("create")) {
                createdGames.add(current);
            }
        }
        return createdGames;
    }

    @GetMapping("/updatedGames")
    public List<Game> getAllUpdatedGame() {
        List<Game> games = gameService.getGames();
        List<Game> createdGames = new ArrayList<>();
        for (Game current: games) {
            if (current.getType().equals("update")) {
                createdGames.add(current);
            }
        }
        return createdGames;
    }

    @GetMapping("/deletedGames")
    public List<Game> getAllDeletedGames() {
        List<Game> games = gameService.getGames();
        List<Game> createdGames = new ArrayList<>();
        for (Game current: games) {
            if (current.getType().equals("delete")) {
                createdGames.add(current);
            }
        }
        return createdGames;
    }
}
