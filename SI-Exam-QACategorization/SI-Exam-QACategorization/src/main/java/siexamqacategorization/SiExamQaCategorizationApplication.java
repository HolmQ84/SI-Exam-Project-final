package siexamqacategorization;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class SiExamQaCategorizationApplication {


    public static void main(String[] args) {
        SpringApplication.run(SiExamQaCategorizationApplication.class, args);
    }

}
