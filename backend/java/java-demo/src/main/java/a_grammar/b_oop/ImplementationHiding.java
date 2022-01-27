package a_grammar.b_oop;

/**
 * @author jay.wang
 * @date 2021-08-20 11:20
 *
 * 面向对象 - 封装
 */
public class ImplementationHiding {
    private int id = 0;

    public void publicMethod() {
        System.out.println("这是公共的方法~");
    }

    protected void ancestralMethod() {
        System.out.println("这是祖传的方法~");
    }

    void packageMethod() {
        System.out.println("这是包里的方法~");
    }

    private void privateMethod() {
        System.out.println("这是自己私有的方法~");
    }
}
