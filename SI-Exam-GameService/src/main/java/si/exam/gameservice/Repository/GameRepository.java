package si.exam.gameservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import si.exam.gameservice.Model.Game;

@Repository
public interface GameRepository extends JpaRepository<Game, Integer> {

}
