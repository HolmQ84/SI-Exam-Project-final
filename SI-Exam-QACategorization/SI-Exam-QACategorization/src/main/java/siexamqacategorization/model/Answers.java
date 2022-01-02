package siexamqacategorization.model;

import lombok.Data;

import javax.persistence.*;

// Calls Lombok to make getters and setters for the entity
@Data
// Tells JPA that it is an entity, so it builds it.
@Entity
public class Answers {

    @TableGenerator(name = "Id_Gen", initialValue = 6)
    @Id
    @GeneratedValue(generator = "Id_Gen")
    private Long id;
    private String question;
    private String answer;

}
