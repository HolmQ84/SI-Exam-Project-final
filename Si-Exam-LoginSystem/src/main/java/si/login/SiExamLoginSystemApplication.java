package si.login;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class SiExamLoginSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(SiExamLoginSystemApplication.class, args);
    }
}
