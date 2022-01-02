package si.exam.gameservice.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import si.exam.gameservice.Model.Game;
import si.exam.gameservice.Model.Review;
import si.exam.gameservice.Model.User;
import si.exam.gameservice.Repository.GameRepository;
import si.exam.gameservice.Repository.ReviewRepository;
import si.exam.gameservice.Repository.UserRepository;

import java.util.List;

@Service
public class HtmlMailCreator {

    @Autowired
    UserRepository userRepository;
    @Autowired
    ReviewRepository reviewRepository;
    @Autowired
    GameRepository gameRepository;

    public String createHtmlMailWithNews() {
        List<User> users = userRepository.findAll();
        List<Game> games = gameRepository.findAll();
        List<Review> reviews = reviewRepository.findAll();
        StringBuilder builder = new StringBuilder();
        builder.append("<body style=\"text-align: center;font-family: Bahnschrift, serif\">\n" +
                "<h1>Hello there</h1><br><br>\n" +
                "<h3>We're bringing you the lastest information about our website</h3>\n" +
                "<h3>Below you can see an overview of the different changes on the website</h3>\n" +
                "<div style=\"color: green\">\n" +
                "    <hr>\n" +
                "    <h4>GAMES</h4>\n" +
                "    <table style=\"margin-left: auto;margin-right: auto\">\n" +
                "        <tr><th>Name</th><th>Genre</th><th>Developers</th><th>Release Date</th><th>Status</th></tr>\n");
        for (Game current: games) {
            builder.append("<tr><td>"+current.getName()+"</td><td>"+current.getGenre()+"</td><td>"+current.getDevelopers()+"</td><td>"+current.getRelease_date()+"</td><td>"+current.getType()+"</td></tr>");
        }
        if (games.size() == 0) {
            builder.append("<tr>No Game changes</tr>");
        }
        builder.append("</table>\n" +
                "</div>\n" +
                "<div style=\"color: red\">\n" +
                "    <hr>\n" +
                "    <h4>REVIEWS</h4>\n" +
                "    <table style=\"margin-left: auto;margin-right: auto\">\n" +
                "        <tr><th>Game ID</th><th>Visual Score</th><th>Gameplay Score</th><th>Sound Score</th><th>Comment</th><th>Status</th></tr>");
        for (Review current: reviews) {
            builder.append("<tr><td>"+current.getGameId()+"</td><td>"+current.getVisualScore()+"</td><td>"+current.getGameplayScore()+"</td><td>"+current.getSoundScore()+"</td><td>"+current.getComment()+"</td></tr><td>"+current.getType()+"</td></tr>");
        }
        if (reviews.size() == 0) {
            builder.append("<tr>No Review Changes</tr>");
        }
        builder.append("</table>\n" +
                "</div>\n" +
                "<div style=\"color: blue\">\n" +
                "    <hr>\n" +
                "    <h4>USERS</h4>\n" +
                "    <table style=\"margin-left: auto;margin-right: auto\">\n" +
                "        <tr><th>Username</th><th>Mail</th><th>Name</th><th>Status</th></tr>");
        for (User current: users) {
            builder.append("<tr><td>"+current.getUsername()+"</td><td>"+current.getMail()+"</td><td>"+current.getName()+"</td><td>"+current.getType()+"</td></tr>");
        }
        if (users.size() == 0) {
            builder.append("<tr>No User changes</tr>");
        }
        builder.append("</table>\n" +
                "</div>\n" +
                "    <hr>\n" +
                "    <h3>We hope you enjoy our website, and thanks for contributing to making our site even better!</h3>\n" +
                "    <h3>Have a nice day!</h3><br><br>\n" +
                "    <h3>Regards from</h3>\n" +
                "    <h1>Gamehub 2.0</h1>\n" +
                "</body>");
        return builder.toString();
    }
}
