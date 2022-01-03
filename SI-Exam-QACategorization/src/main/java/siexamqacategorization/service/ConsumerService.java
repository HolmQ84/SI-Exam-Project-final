package siexamqacategorization.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import siexamqacategorization.producer.ProducerService;
import siexamqacategorization.model.Answers;
import siexamqacategorization.repository.AnswerRepository;
import com.rabbitmq.client.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ConsumerService {

    @Autowired
    AnswerRepository answerRepository;

    @Autowired
    ProducerService producerService;


    //Get logger
    private static final Logger logger = LoggerFactory.getLogger(ConsumerService.class);

    List<String> questionList = new ArrayList<String>();
    public String question;

    private static final String EXCHANGE_NAME = "direct-exchange-camunda";
    private static String bindingKey = "question";
    String message;


    @Bean
    public void connectQueue() throws Exception
    {
        // Same as the producer: tries to create a queue, if it wasn't already created
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("localhost");
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();

        // Register for an exchange
        channel.exchangeDeclare(EXCHANGE_NAME, "direct");
        // Get the automatically generated qname for this exchange
        String queueName = channel.queueDeclare().getQueue();
        logger.info("Queue name from Rabbit producer in QACamunda is : " + queueName);
        // Bind the exchange to the queue
        channel.queueBind(queueName, EXCHANGE_NAME, bindingKey);
        //channel.queueBind(queueName, EXCHANGE_NAME, "");


        // Get notified, if a message for this receiver arrives
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            message = new String(delivery.getBody(), "UTF-8");
            logger.info("Message in RabbitMQ from QACamunda is : " + delivery.getEnvelope().getRoutingKey() + "':'" + message);
            logMessage(message);
        };
        channel.basicConsume(queueName, true, deliverCallback, consumerTag -> { });
    }

    private void logMessage(String message) {
        if (searchDB(message).size() > 1) {
            for (int i = 0; i < searchDB(message).size(); i++) {
                logger.info("From logMessage in consumer  : " + searchDB(message).get(i));
                try {
                    producerService.createQueue(searchDB(message).get(i).toString());
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        } else if (searchDB(message).size() < 1) {
            logger.info("Doesn't have answers");
            try {
                producerService.createQueue("Doesn't have answers");
                producerService.sendMessage(message);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    // List of all questions
    public List<Answers> searchDB(String question) {

        List<Answers> myList = answerRepository.findAll();
        // List for similar questions to the one which has been asked

        List<String> splitWord = Arrays.asList(question.split(" "));
        List<Answers> similarQuestions = new ArrayList<Answers>();
        System.out.println("Wrote from searchDB method " + question);


        for (int j = 0; j < splitWord.size(); j++) {
            for (int i = 0; i < myList.size(); i++) {
                if (myList.get(i).getQuestion().contains(splitWord.get(j))) {
                    similarQuestions.add(myList.get(i));
                }
            }
        }
        return similarQuestions;
    }
}
