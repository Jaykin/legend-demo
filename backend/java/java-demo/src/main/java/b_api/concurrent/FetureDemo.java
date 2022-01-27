package b_api.concurrent;

import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class FetureDemo {
    public static void main(String[] args) throws Exception {
        demo01();
    }

    public static Integer extractResult(Future<Integer> f) {
        try {
            // 当在任务尚未完成的 Future 上调用 get()时，调用会阻塞（等待）直到结果可用
            return f.get();
        } catch(Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static void demo01() throws InterruptedException {
        ExecutorService exec = Executors.newCachedThreadPool();

        List<CountingTask> tasks = IntStream
                .range(0, 10)
                .mapToObj(CountingTask::new)
                .collect(Collectors.toList());
        // 每个任务会创建一个 Future
        List<Future<Integer>> futures = exec.invokeAll(tasks);

        Integer sum = futures
                .stream()
                .map(FetureDemo::extractResult)
                .reduce(0, Integer::sum);

        // futures 全部完成后执行
        System.out.println("sum = " + sum);
        exec.shutdown();
    }
}

class CountingTask implements Callable<Integer> {
    final int id;
    public CountingTask(int id) { this.id = id; }

    @Override
    public Integer call() {
        Integer val = 0;

        for(int i = 0; i < 100; i++) val++;
        System.out.println(id + " " + Thread.currentThread().getName() + " " + val);

        return val;
    }
}
