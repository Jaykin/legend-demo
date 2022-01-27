import com.jay.config.ApplicationConfig;
import com.jay.profile.Role;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = ApplicationConfig.class)
@ActiveProfiles("prod")
public class ProfileTest {
    @Autowired
    private Role role;

    @Test
    public void test() {
        System.out.println(role.getRoleName());
    }
}
