package si.exam.monitor.Service;


import si.exam.monitor.Model.Game;

import java.util.List;

public interface GameService {
    List<Game> getGames();
    String createGame(Game game);
    String updateGame(Game game);
    void deleteGame(String gameId);
}
