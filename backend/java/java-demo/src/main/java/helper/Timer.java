package helper;

public class Timer {
    private long startTime;

    public Timer() {
        startTime = System.currentTimeMillis();
    }

    public long duration() {
        return System.currentTimeMillis() - startTime;
    }

    public long duration(String msg) {
        long duration = System.currentTimeMillis() - startTime;
        System.out.println(msg + duration);
        return duration;
    }
}
