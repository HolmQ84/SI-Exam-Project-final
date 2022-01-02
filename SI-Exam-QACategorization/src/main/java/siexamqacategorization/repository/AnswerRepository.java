package siexamqacategorization.repository;
//https://www.baeldung.com/rest-api-search-language-spring-data-specifications
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import siexamqacategorization.model.Answers;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answers, Long> {

    // Notice, there are no methods here, but we still can use all those, which we inherit from JpaRepository
}
