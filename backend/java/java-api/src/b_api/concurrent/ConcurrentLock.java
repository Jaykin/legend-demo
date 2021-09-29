package b_api.concurrent;

import java.util.concurrent.locks.ReentrantLock;

public class ConcurrentLock {
    private ReentrantLock lock = new ReentrantLock();

    private int a = 0;

    public void writer() {
        lock.lock(); // 获取锁

        try {
            a++;
            System.out.println(Thread.currentThread().getName() + ": " + a);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        } finally {
            lock.unlock(); // 释放锁
        }
    }

    public void reader () {
        lock.lock(); // 获取锁
        try {
            System.out.println(a);
        } finally {
            lock.unlock(); // 释放锁
        }
    }
}