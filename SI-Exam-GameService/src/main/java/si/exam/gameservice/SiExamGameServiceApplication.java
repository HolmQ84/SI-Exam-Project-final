package si.exam.gameservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class SiExamGameServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(SiExamGameServiceApplication.class, args);
    }

}
