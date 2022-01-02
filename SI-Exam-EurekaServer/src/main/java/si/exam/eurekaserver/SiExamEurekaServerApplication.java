package si.exam.eurekaserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@EnableEurekaServer
@SpringBootApplication
public class SiExamEurekaServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(SiExamEurekaServerApplication.class, args);
    }

}
