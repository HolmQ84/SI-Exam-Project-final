package si.exam.gameinfo.Service;

import si.exam.gameinfo.Client.ReviewClient;
import si.exam.gameinfo.Model.GameDTO;
import si.exam.gameinfo.Model.GameInfoDTO;

import java.util.ArrayList;
import java.util.List;

public class ModelConverter {

    public List<GameInfoDTO> convertFromGameDTOToGameInfoDTO(List<GameDTO> games) {
        List<GameInfoDTO> newList = new ArrayList<>();
        ReviewClient client = new ReviewClient();
        for (GameDTO game: games) {
            GameInfoDTO gameInfoDTO = new GameInfoDTO(
                    game.getGame_id(),
                    game.getName(),
                    game.getPicture_url(),
                    game.getDevelopers(),
                    game.getGenre(),
                    game.getPlatform(),
                    game.getRelease_date(),
                    game.getResume()
            );
            gameInfoDTO.setReviews(client.getAllReviewsByGameId(gameInfoDTO.getGame_id()));
            newList.add(gameInfoDTO);
        }
        return newList;
    }

    public GameInfoDTO convertFromGameDTOToGameInfoDTO(GameDTO game) {
        ReviewClient client = new ReviewClient();
        GameInfoDTO gameInfoDTO = new GameInfoDTO(
                game.getGame_id(),
                game.getName(),
                game.getPicture_url(),
                game.getDevelopers(),
                game.getGenre(),
                game.getPlatform(),
                game.getRelease_date(),
                game.getResume(),
                client.getAllReviewsByGameId(game.getGame_id())
        );
        return gameInfoDTO;
    }
}
