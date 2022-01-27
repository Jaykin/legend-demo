import com.jay.config.ApplicationConfig;
import com.jay.di.anno.ConditionalBean;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = ApplicationConfig.class)
public class DITest {
    private static final String PREFIX = "DITest#test: ";

    @Autowired(required = false)
    private ConditionalBean conditionalBean;

    @Test
    public void testConditionalBean() {
        if (conditionalBean != null) {
            System.out.println(PREFIX + conditionalBean.isWired());
        } else {
            System.out.println(PREFIX + "nothing!");
        }
    }
}
