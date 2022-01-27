package b_api.network;

import java.net.InetAddress;

/**
 * 支持两种通信协议：TCP、UDP
 * */
public class NetDemo {
    public static void main(String[] args) throws Exception {
        ipDemo();
    }

    public static void ipDemo() throws Exception {
        InetAddress localAddr = InetAddress.getLocalHost();
        InetAddress remoteAddr = InetAddress.getByName("www.baidu.com");

        System.out.println("本机IP: " + localAddr.getHostAddress());
        System.out.println("百度IP: " + remoteAddr.getHostAddress());
        System.out.println("本地主机是否可达: " + localAddr.isReachable(500));
        System.out.println("百度主机是否可达: " + remoteAddr.isReachable(500));
    }
}
