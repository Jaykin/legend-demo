package b_api.robot;

import java.awt.*;

/**
 * @author jay.wang
 * @date 2021-08-20 12:17
 */
public class RobotDemo {
    public static void main(String[] args) {
        try {
            Robot robot = new Robot();

            robot.mouseMove(120, 120);
            robot.delay(2000);
            robot.mouseMove(240, 240);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }
}
