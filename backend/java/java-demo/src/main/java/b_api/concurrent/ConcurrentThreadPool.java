package b_api.concurrent;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.ArrayList;

// 线程池示例
public class ConcurrentThreadPool {
    public static void main(String[] args) {
        MyThreadPool<Task> threadPool = new MyThreadPool<>();

        for (int i = 0; i < 10; i++) {
            threadPool.execute(new Task());
        }
    }
}

class Task implements Runnable {
    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName() + ": run job!");
    }
}

interface ThreadPool<Job extends Runnable> {
    // 执行一个 job
    void execute(Job job);

    // 关闭线程池
    void shutdown();

    // 增加工作线程
    void addWorker(int num);

    // 减少工作线程
    void removeWorker(int num);

    // 获取正在等待的任务数量
    int getJobSize();
}

class MyThreadPool<Job extends Runnable> implements ThreadPool<Job> {
    private static final int MAX_WORKER_NUMBERS = 10;
    private static final int DEFAULT_WORKER_NUMBERS = 5;
    private static final int MIN_WORKER_NUMBERS = 1;

    // 任务列表（多线程访问，需要同步）
    private final LinkedList<Job> jobs = new LinkedList<Job>();
    // 工作者同步列表
    private final List<Worker> workers = Collections.synchronizedList(new ArrayList<Worker>());

    // 工作者线程的数量
    private int workerNum = DEFAULT_WORKER_NUMBERS;
    // 线程 ID
    private AtomicLong threadNum = new AtomicLong();

    // 构造器
    public MyThreadPool() {
        initWokers(DEFAULT_WORKER_NUMBERS);
    }
    public MyThreadPool(int num) {
        workerNum = num > MAX_WORKER_NUMBERS ? MAX_WORKER_NUMBERS : (num < MIN_WORKER_NUMBERS ? MIN_WORKER_NUMBERS : num);
        initWokers(workerNum);
    }

    // 执行 job
    @Override
    public void execute(Job job) {
        if (job != null) {
            synchronized (jobs) {
                jobs.addLast(job);
                // 需要通知工作者有任务来了(线程通信 - 使用等待/通知模式)
                jobs.notify(); // 通知一个线程即可
            }
        }
    }

    @Override
    public void shutdown() {
        for (Worker worker : workers) {
            worker.shutdown();
        }
    }

    @Override
    public void addWorker(int num) {
        synchronized (jobs) {
            if (num > MAX_WORKER_NUMBERS - workerNum) {
                num = MAX_WORKER_NUMBERS - workerNum;
            }

            initWokers(num);
            this.workerNum += num;
        }
    }

    @Override
    public void removeWorker(int num) {
        synchronized (jobs) {
            if (num >= this.workerNum) {
                throw new IllegalArgumentException("beyond workNum!");
            }
            int count = 0;
            while (count < num) {
                Worker worker = workers.get(count);
                if (workers.remove(worker)) {
                    worker.shutdown();
                    count++;
                }
            }
            this.workerNum -= count;
        }
    }

    @Override
    public int getJobSize() {
        // 没必要锁
        return jobs.size();
    }

    // 初始化 - 创建工作者
    private void initWokers(int num) {
        for (int i = 0; i < num; i++) {
            Worker worker = new Worker();
            workers.add(worker);
            Thread thread = new Thread(worker, "ThreadPool-Worker-" + threadNum.incrementAndGet());
            thread.start();
        }
    }

    // 工作者，负责消费任务
    class Worker implements Runnable {
        // 同步变量，用来 shutdown worker
        private volatile boolean running = true;

        public void run() {
            while (running) {
                Job job = null;
                // 线程被阻塞（进入同步队列）
                synchronized (jobs) {
                    // 如果 jobs 为空，则等待
                    while (jobs.isEmpty()) {
                        try {
                            jobs.wait(); // 进入等待队列
                        } catch (InterruptedException ex) {
                            // 外部中断，则终止线程
                            Thread.currentThread().interrupt();
                            return;
                        }
                    }

                    // 取出一个 job 来执行
                    job = jobs.removeFirst();
                }

                if (job != null) {
                    try {
                        job.run();
                    } catch (Exception ex) {
                    }
                }
            }
            // 线程被终止
        }

        public void shutdown() {
            running = false;
        }
    }
}