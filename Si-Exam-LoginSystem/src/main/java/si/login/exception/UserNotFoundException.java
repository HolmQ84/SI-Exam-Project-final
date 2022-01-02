package si.login.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String s) {
        super(s + "Here is some random message.");
    }
}
