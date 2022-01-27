import com.jay.config.ApplicationConfig;
import com.jay.db.JdbcTemplateDemo;
import com.jay.db.entity.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = ApplicationConfig.class)
public class JdbcTemplateTest {
    @Autowired
    private JdbcTemplateDemo jdbcTemplateDemo;

    @Test
    public void test() {
        List<User> users = jdbcTemplateDemo.findUser("Jay");
        users.forEach(user -> System.out.println(user.toString() + "\n"));
    }
}
