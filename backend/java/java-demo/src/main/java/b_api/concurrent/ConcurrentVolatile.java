package b_api.concurrent;

/**
 * @author jay.wang
 * @date 2021-09-06 10:37
 */
public class ConcurrentVolatile {
    private int count1 = 0;
    /**
     * 1、仅保证可见性
     * 2、无法保证原子性
     * */
    private volatile int count2 = 0;

    private int a = 0;
     // private volatile boolean flag = true;
    private boolean flag = true;

    public void readA() {
        if (flag) {
            System.out.println(Thread.currentThread().getName()  + " a: " + a);
        }

//        try {
//            Thread.sleep(100);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
        System.out.println(Thread.currentThread().getName()  + " 2-a: " + a);
    }

    public void writeA() {
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        a = 1;
        flag = true;
    }

    public void incrementCount() {
        int num = 8000;

        for (int i = 0; i < num; i++) {
            count1++;
            count2++;
        }

        System.out.println(Thread.currentThread().getName()  + " count1: " + count1);
        System.out.println(Thread.currentThread().getName()  + " count2: " + count2);
    }
}
