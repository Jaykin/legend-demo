package helper;

public enum IntegerEnum {
    Q1(1),
    Q2(2),
    Q3(3),
    Q4(4),
    ;

    private Integer value;

    public Integer getValue() {
        return value;
    }

    IntegerEnum(Integer value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return this.getValue().toString();
    }
}
