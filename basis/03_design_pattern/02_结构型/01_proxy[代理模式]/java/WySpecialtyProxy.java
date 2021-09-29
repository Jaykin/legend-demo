/**
 * 需求：韶关“天街e角”公司是一家婺源特产公司的代理公司，用代理模式实现
 * 
 * 需求分析：“婺源特产公司”经营许多婺源特产，它是真实主题，提供了显示特产的 display() 方法;
 * 而韶关“天街e角”公司是婺源特产公司特产的代理，通过调用婺源特产公司的 display() 方法显示代理产品;
 * 当然它可以增加一些额外的处理，如包裝或加价等;
 * 客户可通过“天街e角”代理公司间接访问“婺源特产公司”的产品
 * 
 * 代码设计：
 *      抽象主题类：特产
 *      真实主题类：婺源特产
 *      代理类：韶关代理
 */
public class WySpecialtyProxy {
    public static void main(String[] args) {
        SgProxy proxy = new SgProxy();
        proxy.display();
    }
}

// 抽象主题类: 特产
interface Specialty {
    void display();
}

// 真实主题类: 婺源特产
class WySpecialty implements Specialty {
    public void display() {
        System.out.println("婺源特产");
    }
}

// 韶关代理类
class SgProxy implements Specialty {
    // 对目标对象的引用
    private WySpecialty realSubject = new WySpecialty();

    public void display() {
        preRequest();
        realSubject.display();
        postRequest();
    }

    public void preRequest() {
        System.out.println("韶关代理婺源特产开始...");
    }

    public void postRequest() {
        System.out.println("韶关代理婺源特产结束...");
    }
} 