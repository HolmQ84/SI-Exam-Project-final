package si.exam.monitor.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import si.exam.monitor.Model.User;
import si.exam.monitor.Service.UserService;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/allUsers")
    public List<User> getAllUsers() {
        return userService.getUsers();
    }

    @GetMapping("/createdUsers")
    public List<User> getAllCreatedUsers() {
        List<User> users = userService.getUsers();
        List<User> createdUsers = new ArrayList<>();
        for (User current: users) {
            if (current.getType().equals("create")) {
                createdUsers.add(current);
            }
        }
        return createdUsers;
    }

    @GetMapping("/updatedUsers")
    public List<User> getAllUpdatedUsers() {
        List<User> users = userService.getUsers();
        List<User> updatedUsers = new ArrayList<>();
        for (User current: users) {
            if (current.getType().equals("update")) {
                updatedUsers.add(current);
            }
        }
        return updatedUsers;
    }

    @GetMapping("/deletedUsers")
    public List<User> getAllDeletedReviews() {
        List<User> users = userService.getUsers();
        List<User> deletedUsers = new ArrayList<>();
        for (User current: users) {
            if (current.getType().equals("delete")) {
                deletedUsers.add(current);
            }
        }
        return deletedUsers;
    }

    @GetMapping("/loginUsers")
    public List<User> getAllUserLogins() {
        List<User> users = userService.getUsers();
        List<User> loginUsers = new ArrayList<>();
        for (User current: users) {
            if (current.getType().equals("login")) {
                loginUsers.add(current);
            }
        }
        return loginUsers;
    }
}
