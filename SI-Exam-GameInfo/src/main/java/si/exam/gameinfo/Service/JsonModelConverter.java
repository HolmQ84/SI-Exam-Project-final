package si.exam.gameinfo.Service;

import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import si.exam.gameinfo.Model.GameDTO;
import si.exam.gameinfo.Model.ReviewDTO;

import java.lang.reflect.Type;
import java.util.List;

public class JsonModelConverter {

    public List<GameDTO> convertJsonToListOfGameDTO(JSONArray games) {
        Gson gson = new Gson();
        Type type = new TypeToken<List<GameDTO>>(){}.getType();
        return gson.fromJson(String.valueOf(games), type);
    }

    public GameDTO convertGameDTOToModel(JSONObject game) {
        Gson gson = new Gson();
        Type type = new TypeToken<GameDTO>(){}.getType();
        return gson.fromJson(String.valueOf(game), type);
    }

    public JSONObject reviewToObject(ReviewDTO reviewDTO) {
        JSONObject object = new JSONObject();
        object.put("reviewId", reviewDTO.getReviewId());
        object.put("gameId", reviewDTO.getGameId());
        object.put("userId", reviewDTO.getUserId());
        object.put("visualScore", reviewDTO.getVisualScore());
        object.put("gameplayScore", reviewDTO.getGameplayScore());
        object.put("soundScore", reviewDTO.getSoundScore());
        object.put("comment", reviewDTO.getComment());
        object.put("createdTimestamp", reviewDTO.getCreatedTimestamp());
        object.put("updatedTimestamp", reviewDTO.getUpdatedTimestamp());
        return object;
    }

    public JSONObject gameToObject(GameDTO gameDTO) {
        JSONObject object = new JSONObject();
        object.put("game_id", gameDTO.getGame_id());
        object.put("name", gameDTO.getName());
        object.put("picture_url", gameDTO.getPicture_url());
        object.put("developers", gameDTO.getDevelopers());
        object.put("genre", gameDTO.getGenre());
        object.put("platform", gameDTO.getPlatform());
        object.put("release_date", gameDTO.getRelease_date());
        object.put("resume", gameDTO.getResume());
        return object;
    }
}
