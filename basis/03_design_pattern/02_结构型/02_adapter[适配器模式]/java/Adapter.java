public class Adapter {
    public static void main(String[] args) {
        // 类适配器
        // Target target = new ClassAdapter();
        // target.request();

        // 对象适配器
        Adaptee adaptee = new Adaptee();
        Target target = new ObjectAdapter(adaptee);
        target.request();
    }
}

// 目标接口
interface Target {
    public void request();
} 

// 适配者类
class Adaptee {
    public void specificRequest() {
        System.out.println("适配者中的业务代码被调用...");
    }
}

// ============================ 类适配器 ============================
// 适配器类
class ClassAdapter extends Adaptee implements Target {
    public void request() {
        specificRequest();
    }
}

// ============================ 对象适配器 ============================
// 适配器类
class ObjectAdapter implements Target {
    private Adaptee adaptee; // 关联适配者对象

    public ObjectAdapter(Adaptee adaptee) {
        this.adaptee = adaptee;
    }

    public void request() {
        adaptee.specificRequest();
    }
}
