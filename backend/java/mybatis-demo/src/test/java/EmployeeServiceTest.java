import com.jay.entity.Employee;
import com.jay.service.EmployeeService;
import org.apache.log4j.Logger;

public class EmployeeServiceTest {
    private static Logger logger = Logger.getLogger(EmployeeServiceTest.class);

    public static void main(String[] args) {
        EmployeeService employeeService = new EmployeeService();

        Employee vivian = employeeService.getEmployeeById(1L);
        // Employee jay = employeeService.getEmployeeById(2L);

        System.out.println(vivian.getRealName());
    }
}
