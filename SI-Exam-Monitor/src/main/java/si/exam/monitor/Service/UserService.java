package si.exam.monitor.Service;

import si.exam.monitor.Model.User;

import java.util.List;

public interface UserService {
    List<User> getUsers();
    String createUser(User user);
    String updateUser(User user);
    void deleteUser(String userId);
}
