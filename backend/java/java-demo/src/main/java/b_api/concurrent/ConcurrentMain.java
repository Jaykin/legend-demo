package b_api.concurrent;

import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;

/**
 * @author jay.wang
 * @date 2021-09-02 18:43
 *
 * 做并发测试
 */
public class ConcurrentMain {
    private static ConcurrentVolatile cv = new ConcurrentVolatile();
    private static ConcurrentLock cl = new ConcurrentLock();

    public static void main(String[] args) throws InterruptedException {
        Runnable taskTemp = new Runnable() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName() + " - " + System.currentTimeMillis() + " all ready...");
            }
        };

        startNThreadsByBarrier(2, taskTemp);
    }

    static void exec() {
        String threadName = Thread.currentThread().getName();

        // 执行请求
        // cv.incrementCount();

//        if (threadName.equals("Thread-0")) {
//            cv.writeA();
//        } else if (threadName.equals("Thread-1")) {
//            cv.readA();
//        }

        if (threadName.equals("Thread-0")) {
//            cl.reader();
            cl.writer();
        } else if (threadName.equals("Thread-1")) {
            cl.writer();
        }

    }

    static void startNTThreads(int threadNums, Runnable task) {
        for (int i = 0; i < threadNums; i++) {
            new Thread(task).start();
        }
    }

    public static void startNThreadsByBarrier(int threadNums, Runnable finishTask) throws InterruptedException {
        CyclicBarrier barrier = new CyclicBarrier(threadNums, finishTask);

        // 启动 n 个线程，与栅栏阀值一致，即当线程准备数达到要求时，栅栏刚好开启，从而达到统一控制效果
        for (int i = 0; i < threadNums; i++) {
            Thread.sleep(100);
            new Thread(new CounterTask(barrier)).start();
        }
    }
}

class CounterTask implements Runnable {
    private CyclicBarrier barrier;

    public CounterTask(final CyclicBarrier barrier) {
        this.barrier = barrier;
    }

    public void run() {
        System.out.println(Thread.currentThread().getName() + " - " + System.currentTimeMillis() + " is ready...");

        try {
            // 设置栅栏，使在此等待，到达位置的线程达到要求即可开启大门
            barrier.await();
        } catch (InterruptedException | BrokenBarrierException e) {
            e.printStackTrace();
        }

        ConcurrentMain.exec();
    }
}
