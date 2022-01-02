package si.exam.monitor.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import si.exam.monitor.Model.User;
import si.exam.monitor.Repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public String createUser(User user) {
        return this.userRepository.save(user).getId();
    }

    @Override
    public String updateUser(User user) {
        Optional<User> updateUser = this.userRepository.findById(user.getId());
        if (updateUser.isPresent()) {
            User current = updateUser.get();
            current.setUserId(user.getUserId());
            current.setUsername(user.getUsername());
            current.setPassword(user.getPassword());
            return this.userRepository.save(current).getId();
        }
        return null;
    }

    @Override
    public void deleteUser(String userId) {
        this.userRepository.deleteById(userId);
    }
}
