package Server;

import Service.ReviewServiceImpl;
import io.grpc.Server;
import io.grpc.ServerBuilder;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

@EnableEurekaClient
public class ReviewServer {
    private static final Logger logger = Logger.getLogger(ReviewServiceImpl.class.getName());

    public static void main(String[] args) {

        //Starter server på angivet port
        Server server = ServerBuilder.forPort(8084)
                .addService(new ReviewServiceImpl())
                .build();
        try {
            server.start();
            logger.log(Level.INFO, "gRPC Review Server started on port: 8084");
            server.awaitTermination();
        } catch (IOException e) {
            logger.log(Level.SEVERE, "gRPC Server did not start due to a IO Exception.");
        } catch (InterruptedException e) {
            logger.log(Level.SEVERE, "gRPC Server did not start due to a Interrupt.");
        }
    }
}
