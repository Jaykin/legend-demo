import com.jay.entity.User;
import com.jay.service.UserService;

public class MybatisBasicUseTest {
    public static void main(String[] args) {
        UserService userService = new UserService();

        User user = userService.getUserById(1L);
        System.out.println(user);
    }
}
