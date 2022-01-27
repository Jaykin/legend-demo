package a_grammar.c_generics;

/**
 * 泛型方法
 * - 支持类型推断，即调用方法时不需要指定类型
 * */
public class GenericsMethod {
    public static void main(String[] args) {
        GMethod gMethod = new GMethod();
        gMethod.temp("");
        gMethod.temp(1);
        gMethod.temp(1.0F);
        gMethod.temp('c');
        gMethod.temp(gMethod);
    }
}

/**
 * 定义泛型方法
 * - 如果方法是 static 的，则无法访问该类的泛型类型参数
 * - 泛型参数列表放置在返回值之前 <T>
 * */
class GMethod {
    public <T> void temp(T x) {
        System.out.println("GMethod: " + x.getClass().getName());
    }
}