/**
 * 懒汉式单例
 * 
 * 1、类加载时没有生成单例，只有第一次调用getInstance 方法时才去创建
 * 2、需要保证线程安全
*/
public class LazySingleton {
    private static volatile LazySingleton instance = null;

    private LazySingleton() {
        // 私有构造函数，避免在外部被实例化
    }

    // 需要用 synchronized 保证线程安全
    public static synchronized LazySingleton getInstance() {
        if (instance == null) {
            instance = new LazySingleton();
        }

        return instance;
    }
}