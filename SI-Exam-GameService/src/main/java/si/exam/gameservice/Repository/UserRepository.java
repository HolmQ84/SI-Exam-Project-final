package si.exam.gameservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import si.exam.gameservice.Model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
}
