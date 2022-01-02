package siexamqacategorization.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import siexamqacategorization.service.ConsumerService;
import siexamqacategorization.repository.AnswerRepository;
import siexamqacategorization.model.Answers;


import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("answers")
public class AnswerController {

    static final Logger logger = LoggerFactory.getLogger(ConsumerService.class);

    @Autowired
    AnswerRepository answerRepository;

    @Autowired
    ConsumerService consumerService;

    @GetMapping("/")
    public List<Answers> retrieveAllAnswers() {
        System.out.println(answerRepository.findAll());
        return answerRepository.findAll();
    }

    @GetMapping("/q/{question}")
    public List<Answers> searchQuestions(@PathVariable String question) {


        // List of all questions
        List<Answers> myList = answerRepository.findAll();
        // List for similar questions to the one which has been asked
        List<Answers> arr = new ArrayList<Answers>();


        for (int i = 0; i < myList.size(); i++) {
            if (myList.get(i).getQuestion().contains(question)) {
                System.out.println(myList.get(i));
                arr.add(myList.get(i));
            }
        }
        return arr;
    }

    @GetMapping("/{id}")
    public String getAnswerById(@PathVariable long id) {
        Answers answers = answerRepository.getById(id);

        System.out.println(answers);
        return "NO!!!";
    }
}
