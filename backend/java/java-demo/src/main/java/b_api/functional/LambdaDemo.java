package b_api.functional;

/**
 * @author jay.wang
 * @date 2021-08-26 11:40
 */
public class LambdaDemo {
    public static void main(String[] args) {
        LambdaDemo.useBodyByAnonymousClass();
        LambdaDemo.useBodyByLambda();
    }

    /** 1、使用匿名内部类实现 **/
    public static void useBodyByAnonymousClass() {
        Body body = new Body() {
            public String detail(String h) {
                return h + " by Anonymous Class!";
            }
        };

        System.out.println(body.detail("single"));
    }

    /** 2、使用 Lamdba表达式 实现 **/
    public static void useBodyByLambda() {
        Body body = (h) -> h + " by Lambda!";

        System.out.println(body.detail("single"));
    }
}


interface Body {
    String detail(String head);
}