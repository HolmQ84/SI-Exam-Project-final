package si.exam.gameservice.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import si.exam.gameservice.Model.User;
import si.exam.gameservice.Service.EmailService;
import si.exam.gameservice.Service.HtmlMailCreator;

@RestController
public class MailController {

    @Autowired
    EmailService emailService;

    @Autowired
    HtmlMailCreator creator;

    @PostMapping("/sendNewsletter")
    public String sendMail(@RequestBody User user) {
        System.out.println(user);

        return emailService.sendWeeklyNewsletter(user.getMail(), creator.createHtmlMailWithNews());
    }
}
