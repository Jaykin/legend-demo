/**
 * 饿汉式单例
 * 
 * 1、类一旦加载就创建一个单例，保证在调用 getInstance 方法之前单例已经存在了
*/

public class HungrySingleton {
    private static final HungrySingleton instance = new HungrySingleton();

    private HungrySingleton() {
        // 私有构造函数，避免在外部被实例化
    }

    public static HungrySingleton getInstance() {
        return instance;
    }
}