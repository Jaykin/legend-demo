public class DecoratorPattern {
    public static void main(String[] args) {
        Component comp = new ConcreteComponent();
        comp.operation();

        System.out.println("---------------------------------");

        Component compPlus = new ConcreteDecorator(comp);
        compPlus.operation();
    }
}

// 抽象组件接口
interface Component {
    public void operation();
}

// 具体组件类
class ConcreteComponent implements Component {
    public ConcreteComponent() {
        System.out.println("创建具体组件角色");
    }
    public void operation() {
        System.out.println("调用具体组件角色的方法operation()");
    }
}

// 抽象装饰类
class Decorator implements Component {
    // 需要装饰的具体组件对象
    private Component component;

    public Decorator(Component component) {
        this.component = component;
    }

    public void operation() {
        component.operation();
    }
}

// 具体装饰类
class ConcreteDecorator extends Decorator {
    public ConcreteDecorator(Component component) {
        super(component);
    }

    public void operation() {
        super.operation();
        addedFunction();
    }

    // 动态扩展的功能
    public void addedFunction() {
        System.out.println("为具体组件角色增加额外的功能 addedFunction()");
    }
}