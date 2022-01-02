package si.exam.gameinfo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class SiExamGameInfoApplication {

    public static void main(String[] args) {
        SpringApplication.run(SiExamGameInfoApplication.class, args);
    }

}
