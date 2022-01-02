package si.exam.gameservice.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Service
public class EmailService {

    @Value("${spring.mail.host}")
    private String host;
    @Value("${spring.mail.port}")
    private int port;
    @Value("${spring.mail.username}")
    private String username;
    @Value("${spring.mail.password}")
    private String password;
    @Value("${spring.mail.provider}")
    private String provider;

    public String sendSimpleMessage(String receiverMail, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(provider);
        message.setTo(receiverMail);
        message.setSubject(subject);
        message.setText(text);
        try {
            getJavaMailSender().send(message);
            return "Mail successfully sent.";
        } catch (Exception e) {
            return "Error while sending mail.";
        }
    }

    public String sendWeeklyNewsletter(String receiverMail, String text) {
        MimeMessage message = getJavaMailSender().createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(provider);
            helper.setTo(receiverMail);
            helper.setSubject("Weekly Newsletter");
            helper.setText(text, true);
            getJavaMailSender().send(message);
            return "Mail successfully sent.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error while sending mail.";
        }
    }

    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(host);
        mailSender.setPort(port);
        mailSender.setUsername(username);
        mailSender.setPassword(password);

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }
}
