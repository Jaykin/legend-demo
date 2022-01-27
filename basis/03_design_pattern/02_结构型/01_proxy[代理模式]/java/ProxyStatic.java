import java.util.Objects;

/**
 * 静态代理类
 */
public class ProxyStatic implements AbstractSubject {
    private RealSubject realSubject;

    public void request() {
        if (Objects.isNull(realSubject)) {
            realSubject = new RealSubject();
        }

        preRequest();
        realSubject.request();
        postRequest();
    }

    public void preRequest() {
        System.out.println("访问真实主题之前的预处理 by Proxy ...");
    }
    public void postRequest() {
        System.out.println("访问真实主题之后的后续处理  by Proxy ...");
    }
}
