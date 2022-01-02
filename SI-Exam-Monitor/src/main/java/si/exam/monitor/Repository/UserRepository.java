package si.exam.monitor.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import si.exam.monitor.Model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
}
