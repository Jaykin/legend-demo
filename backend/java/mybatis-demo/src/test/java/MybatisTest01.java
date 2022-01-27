import com.jay.entity.User;
import com.jay.mapper.UserMapper;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.InputStream;
import java.util.List;

public class MybatisTest01 {
    public static void main(String[] args) throws Exception {
        // 方式一、通过 xml 配置文件（推荐）
        // mybatis 自带 Resource 工具
        InputStream mybatisConfig = Resources.getResourceAsStream("mybatis-config.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(mybatisConfig);

        // 方式二、通过 mybatis 提供的配置类（xml 中的标签都有相对应的类）
        // TransactionFactory transactionFactory = new JdbcTransactionFactory();
        // Environment environment = new Environment("development", transactionFactory, null);
        // Configuration configuration = new Configuration(environment);
        // SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(configuration);

        SqlSession sqlSession = sqlSessionFactory.openSession();
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        // 利用 mapper.xml 执行 sql
        User user = userMapper.selectById(1);

        // 利用注解执行 sql
        List<User> userList = userMapper.selectListByAge(18);

        System.out.println(user);
        System.out.println(userList);
    }
}
