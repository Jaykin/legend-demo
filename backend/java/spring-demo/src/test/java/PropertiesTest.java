import com.jay.config.ApplicationConfig;
import com.jay.properties.Role;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = ApplicationConfig.class)
public class PropertiesTest {
    @Autowired
    private Role role;

    @Test
    public void test() {
        System.out.println("PropertiesTest#test: " + role.getRoleName());
    }
}
