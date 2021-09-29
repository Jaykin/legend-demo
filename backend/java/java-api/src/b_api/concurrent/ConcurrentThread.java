package b_api.concurrent;

/**
 * 线程 Thread
 * */
public class ConcurrentThread {
    public static void main(String[] args) {
        MultiThread04.main(args);
    }
}

// ============================== 1、线程操作 ==============================
    // 1.1 创建 - 继承 Thread
class MyThread01 extends Thread {
        // 重写 run 方法，线程启动时会并发的执行 run 方法
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println("Child Thread " + i + " ");
        }
    }
}

class MultiThread01 {
    public static void main(String[] args) {
        MyThread01 t = new MyThread01();
        t.start(); // 启动线程

        // 主线程继续同时执行
        for (int i = 0; i < 10; i++) {
            System.out.println("Main Thread " + i + " ");
        }
    }
}

    // 1.2 创建 - 实现 Runnable 接口
class MyThread02 implements Runnable {
        // 重写 run 方法，线程启动时会并发的执行 run 方法
    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println("Child Thread " + i + " ");
        }
    }
}

class MultiThread02 {
    public static void main(String[] args) {
        Thread t = new Thread(new MyThread02());
        t.start();  // 启动子线程

        // 主线程继续同时执行
        for (int i = 0; i < 10; i++) {
            System.out.println("Main Thread " + i + " ");
        }
    }
}

    // 1.3 暂停当前线程
class MultiThread03 {
    public static void main(String[] args) {
        MyThread01 t = new MyThread01();
        t.start(); // 启动线程

        // 暂停主线程，注意捕获中断异常
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {

        }
        

        // 主线程继续同时执行
        for (int i = 0; i < 10; i++) {
            System.out.println("Main Thread " + i + " ");
        }
    }
}

    // 1.4 共享互斥
class SupClass {
    public void writer() {}
    public void reader() {}
}

class UnSyncClass extends SupClass {
    int a = 0;
    boolean flag = false;

    public void writer() {
        try {
            Thread.sleep(5000);
        } catch (Exception ex) {
            System.out.println(ex);
        }
        a = 1;
        flag = true;
        System.out.println("writer: " + Thread.currentThread().getName());
    }

    public void reader() {
        if (flag) {
            int i = a;
            System.out.println("reader: i = " + i + " " + Thread.currentThread().getName());
        }
    }
}

class SyncClass extends SupClass {
    int a = 1;
    boolean flag = false;

    public synchronized void writer() {
        try {
            Thread.sleep(5000);
        } catch (Exception ex) {
            System.out.println(ex);
        }
        a = 2;
        flag = true;
        System.out.println("writer: " + Thread.currentThread().getName());
    }

    public synchronized void reader() {
        int i = 0;
        if (flag) {
            i = a;
        }
        System.out.println("reader: i = " + i + " " + Thread.currentThread().getName());
    }
}

class MyThread03 extends Thread {
    SupClass temp;

    MyThread03() {}
    MyThread03(SupClass unsync) {
        temp = unsync;
    }

    public void run() {
        temp.writer();
    }
}

class MyThread0302 extends Thread {
    SupClass temp;

    MyThread0302() {}
    MyThread0302(SupClass unsync) {
        temp = unsync;
    }

    public void run() {
        temp.reader();
        // 下面的语句被 reader 阻塞了，因为其在 sleep 且是同步操作
        System.out.println("after reader " + Thread.currentThread().getName());
    }
}

class MultiThread04 {
    public static void main(String[] args) {
        // SupClass unsync = new UnSyncClass();
        SupClass unsync = new SyncClass();
        MyThread03 t1 = new MyThread03(unsync);
        MyThread0302 t2 = new MyThread0302(unsync);
        t1.start();
        t2.start();
    }
}

    // 1.5 中断
class MyThread04 extends Thread {
    public void run() {
        System.out.println("Child Thread: MyThread04 running");
        // 判断中断 
        while (!this.isInterrupted()) {
            System.out.println("Child Thread: MyThread04 uninterrupted");
        }
        
        System.out.println("Child Thread: MyThread04 interrupted");
    }
}

class MultiThread05 {
    public static void main(String[] args) {
        MyThread04 t = new MyThread04();

        try {
            t.start();
            Thread.sleep(5);
            t.interrupt();
        } catch (Exception ex) {
            System.out.println(ex);
        }
    }
}

    // 1.6 协调
