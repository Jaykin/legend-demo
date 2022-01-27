/**
 * 真实主题类
 */
public class RealSubject implements AbstractSubject {
    private String desc;

    public RealSubject(String desc) {
        this.desc = desc;
    }

    public void request() {
        System.out.println("访问了真实主题对象的方法..." + desc);
    }
}
