package si.login.controller;

import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;
import si.login.exception.UserNotFoundException;
import si.login.model.User;
import si.login.repository.UserRepository;
import si.login.service.JsonConverter;
import si.login.service.KafkaService;
import si.login.service.UserService;

import java.util.List;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    KafkaService kafkaService = new KafkaService();

    JsonConverter converter = new JsonConverter();

    @GetMapping("/")
    public ResponseEntity<Object> getAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/{userId}")
    public EntityModel<User> getUserById(@PathVariable int userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty())
            throw new UserNotFoundException("id: " + userId);

        EntityModel<User> resource = EntityModel.of(user.get()); 						        // Convert to EntityModel<User>.
        WebMvcLinkBuilder linkTo = linkTo(methodOn(this.getClass()).getAllUsers());             // Get link
        resource.add(linkTo.withRel("all-users"));										        // Append link to all users to resource.

        Link selfLink = linkTo(methodOn(this.getClass()).getUserById(userId)).withSelfRel();    // Get self link.
        resource.add(selfLink);                                                                 // Append self link to resource.
        return resource;
    }

    @PutMapping("/{userId}")
    public ResponseEntity<String> updateExistingUser(@PathVariable int userId, @RequestBody User requestedUser) {
        return userService.updateExistingUser(userId, requestedUser);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteExistingUser(@PathVariable int userId) {
        return userService.deleteExistingUser(userId);
    }
}
