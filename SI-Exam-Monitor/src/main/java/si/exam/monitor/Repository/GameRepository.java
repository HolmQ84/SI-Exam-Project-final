package si.exam.monitor.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import si.exam.monitor.Model.Game;

@Repository
public interface GameRepository extends MongoRepository<Game, String> {

}
