package si.exam.gameservice.Service;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import si.exam.gameservice.Model.Game;
import si.exam.gameservice.Model.Review;
import si.exam.gameservice.Model.User;
import si.exam.gameservice.Repository.GameRepository;
import si.exam.gameservice.Repository.ReviewRepository;
import si.exam.gameservice.Repository.UserRepository;

import java.util.Date;

@Service
public class KafkaService {

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    GameRepository gameRepository;

    @KafkaListener(topics = "games", groupId = "SI-Exam-GameService")
    public void getGameNews(String message) {
        try {
            Game game = new Gson().fromJson(message, Game.class);
            System.out.println(game);
            game.setStoreDate(new Date().getTime());
            gameRepository.save(game);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @KafkaListener(topics = "reviews", groupId = "SI-Exam-GameService")
    public void getReviewNews(String message) {
        try {
            Review review = new Gson().fromJson(message, Review.class);
            System.out.println(review);
            review.setStoreDate(new Date().getTime());
            reviewRepository.save(review);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @KafkaListener(topics = "users", groupId = "SI-Exam-GameService")
    public void getUserNews(String message) {
        try {
            User user = new Gson().fromJson(message, User.class);
            System.out.println(user);
            user.setStoreDate(new Date().getTime());
            userRepository.save(user);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
