import com.jay.aop.Role;
import com.jay.aop.RoleService;
import com.jay.config.AopConfig;
import com.jay.config.ApplicationConfig;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { ApplicationConfig.class })
public class AopTest {
    private static final String PREFIX = "AopTest#test: ";

    @Autowired(required = false)
    private RoleService roleService;

    @Autowired
    private Role role;

    @Test
    public void test() {
        // roleService.printRole(role);
        // System.out.println((float)15660895687L/2592000000L);
        // System.out.println((float)15551999005L/2592000000L);
        // System.out.println((float)15660895687L/2592000000L - (float)15551999005L/2592000000L);
        // System.out.println((double) ((15660895687L - 15551999005L) / 2592000000L));


        System.out.println((float) (1639144332575L - 1624586399995L)/2592000000L);
        System.out.println((float) (1637546399000L - 1624586399995L)/2592000000L);
    }
}
