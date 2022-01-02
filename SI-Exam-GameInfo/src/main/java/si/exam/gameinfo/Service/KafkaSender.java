package si.exam.gameinfo.Service;

import net.minidev.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import si.exam.gameinfo.Model.ReviewDTO;

@Service
public class KafkaSender {

    @Autowired
    KafkaTemplate<String, String> template;

    JsonModelConverter jsonModelConverter = new JsonModelConverter();

    private final Logger logger = LoggerFactory.getLogger(KafkaSender.class);

    public void sendGameTopic(String gameDTO) {
        String topic = "games";
        template.send(topic, gameDTO);
        logger.info("Sent Info to Kafka - " + gameDTO);
        template.flush();
    }

    public void sendReviewTopic(JSONObject reviewDTO) {
        String topic = "reviews";
        template.send(topic, reviewDTO.toString());
        logger.info("Sent Info to Kafka - " + reviewDTO);
        template.flush();
    }
}
