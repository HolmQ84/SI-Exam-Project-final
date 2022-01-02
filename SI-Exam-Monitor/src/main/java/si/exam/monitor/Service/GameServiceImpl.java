package si.exam.monitor.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import si.exam.monitor.Model.Game;
import si.exam.monitor.Repository.GameRepository;

import java.util.List;
import java.util.Optional;

@Service
public class GameServiceImpl implements GameService {

    @Autowired
    private GameRepository repo;

    @Override
    public List<Game> getGames() {
        return this.repo.findAll();
    }

    @Override
    public String createGame(Game game) {
        return this.repo.save(game).getId();
    }

    @Override
    public String updateGame(Game game) {
        Optional<Game> updateGame = this.repo.findById(game.getId());
        if (updateGame.isPresent()) {
            Game current = updateGame.get();
            current.setGame_id(game.getGame_id());
            current.setName(game.getName());
            current.setPicture_url(game.getPicture_url());
            current.setDevelopers(game.getDevelopers());
            current.setGenre(game.getGenre());
            current.setPlatform(game.getPlatform());
            current.setRelease_date(game.getRelease_date());
            current.setResume(game.getResume());
            current.setType(game.getType());
            return this.repo.save(current).getId();
        }
        return null;
    }

    @Override
    public void deleteGame(String orderId) {
        this.repo.deleteById(orderId);
    }
}
