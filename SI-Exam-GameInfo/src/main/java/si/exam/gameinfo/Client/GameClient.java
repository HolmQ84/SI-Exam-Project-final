package si.exam.gameinfo.Client;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.client.RestTemplate;

@Component
public class GameClient {
    RestTemplate restTemplate = new RestTemplate();

    public JSONArray getAllGames() {
        String uri = "http://localhost:8083/games/";
        return restTemplate.getForObject(uri, JSONArray.class);
    }

    public JSONObject getGameById(int id) {
        String uri = "http://localhost:8083/games/" + id;
        return restTemplate.getForObject(uri, JSONObject.class);
    }

    public JSONArray getGamesBySearch(String searchResult) {
        String uri = "http://localhost:8083/games/search/" + searchResult;
        return restTemplate.getForObject(uri, JSONArray.class);
    }

    public String createGame(@RequestBody JSONObject game) {
        String uri = "http://localhost:8083/games/";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> request = new HttpEntity<>(game.toString(), headers);
        String message;
        try {
            message = restTemplate.postForObject(uri, request, String.class);
        } catch (Exception e) {
            message = e.getMessage();
        }
        return message;
    }

    public String updateGame(@RequestBody JSONObject game, @PathVariable int id) {
        String url = "http://localhost:8083/games/"+id;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(game.toString(), headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.PUT, entity, String.class, id);
        // check the response, e.g. Location header,  Status, and body
        System.out.println(response.getHeaders().getLocation());
        System.out.println(response.getStatusCode());
        return response.getBody();
    }

    public String deleteGame(@PathVariable int id) {
        String url = "http://localhost:8083/games/"+id;
        try {
            restTemplate.delete(url, id);
        } catch (Exception e) {
            return "Failed to delete game with ID: "+id;
        }
        return "Successfully deleted game with ID: "+id;
    }
}
