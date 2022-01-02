package si.exam.monitor.Service;

import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import si.exam.monitor.Model.Game;
import si.exam.monitor.Model.Review;
import si.exam.monitor.Model.User;
import si.exam.monitor.Repository.GameRepository;
import si.exam.monitor.Repository.ReviewRepository;
import si.exam.monitor.Repository.UserRepository;

@Service
public class KafkaService {

    private final Logger logger = LoggerFactory.getLogger(KafkaService.class);

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    GameRepository gameRepository;

    @Autowired
    UserRepository userRepository;

    @KafkaListener(topics = "games", groupId = "SI-Exam-Monitor")
    public void newGames(String message) {
        try {
            Game game = new Gson().fromJson(message, Game.class);
            logger.info("Game added - type: " + game.getType());
            gameRepository.save(game);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @KafkaListener(topics = "reviews", groupId = "SI-Exam-Monitor")
    public void createdReview(String message) {
        try {
            Review review = new Gson().fromJson(message, Review.class);
            logger.info("Review added - type: " + review.getType());
            reviewRepository.save(review);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @KafkaListener(topics = "users", groupId = "SI-Exam-Monitor")
    public void createdUser(String message) {
        try {
            User user = new Gson().fromJson(message, User.class);
            logger.info("User added - type: " + user.getType());
            userRepository.save(user);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
