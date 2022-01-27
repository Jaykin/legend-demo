package a_grammar.b_oop;

/**
 * 类成员
 * 
 * 变量
 *      声明与初始化
 *          type identifier [ = value][, identifier [= value] ...];
 * 
 *      类型
 *          - 类变量（静态变量）
 *          - 实例变量（成员变量/非静态变量）
 *          - 局部变量
 * 方法
 *      构造方法
 *      实例方法
 *      静态方法
 * 
*/

public class Member {
    // 主方法入口
    public static void main(String []args) {
        // 1、静态方法访问实例变量(先创建对象实例)
        Member v1 = new Member();
        System.out.println(v1);
    }

    // ==================== 1、类变量（静态变量）====================
    static int allClicks;
    public static final String DEPER = "开发";  // 常量

    // ==================== 2、实例变量 ====================
    public int ii;              // 可以不初始化，默认值为 0
    public String str = "hello, world;";

    // ==================== 3、局部变量 ====================
    public void doSomething() {
        int i = 0;              // 局部变量 i
        // int j;               // 未初始化，编译报错
        System.out.println(i);  // 局部变量仅在声明块中能使用

        // 使用实例变量
        System.out.println(str);
        // 使用静态变量
        System.out.println(Member.DEPER);
    }


    // ==================== 构造方法 ====================
    Member(){
        allClicks = 0;
    }
    // ==================== 实例方法 ====================
    public void method1(){
        System.out.println("method1 be called!"); 
    }
    // ==================== 静态方法 ====================
    public static void staticMethod1(){
        System.out.println("staticMethod1 be called!"); 
    }
}