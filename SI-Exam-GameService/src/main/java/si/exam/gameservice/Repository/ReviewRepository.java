package si.exam.gameservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import si.exam.gameservice.Model.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
}
