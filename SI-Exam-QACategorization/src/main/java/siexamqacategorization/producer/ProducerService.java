package siexamqacategorization.producer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

@Service
public class ProducerService {


    private static Logger logger = LoggerFactory.getLogger(ProducerService.class);

    //private final static String QUEUE_NAME = "helloqueue";
    // non-durable, exclusive, auto-delete queue with an automatically generated name
    private static String queueName = null; // never used here
    private final static String EXCHANGE_NAME = "direct-answer-exchange";
    private static String routingKey = "answer";


    public void createQueue(String message) throws Exception
    {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel())
        {
            // channel.queueDeclare(queueName, false, false, false, null);
            channel.exchangeDeclare(EXCHANGE_NAME, "direct");
            channel.basicPublish(EXCHANGE_NAME, routingKey, null, message.getBytes("UTF-8"));
        }

    }




    /*

    private static final String TOPIC = "similar-questions";
    @Autowired
    private KafkaTemplate<String, String> template;

    public void sendMessage(String message){
        template.send(TOPIC, message);
        logger.info("### ProducerService sends message [{}]", message);
        template.flush();
    }

 */
}
