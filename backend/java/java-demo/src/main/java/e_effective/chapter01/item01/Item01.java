package e_effective.chapter01.item01;

import java.util.ServiceLoader;
import java.util.regex.Pattern;

public class Item01 {
    public static void main(String[] args) {
        Person man = Person.newMan(18, "Jay");
        System.out.println(man);
        System.out.println(Person.GOD.equals(Person.GOD));
    }
}

class Person {
    private String sex;
    private int age;
    private String name;

    // 2、可支持缓存对象：单例
    public static final Person GOD = new Person("man", 0, "god");

    // 构造器创建对象
    public Person (String sex, int age, String name) {
        this.sex = sex;
        this.age = age;
        this.name = name;
    }

    // 1、静态方法可赋予更可读的名称：静态工厂方法创建【男性的Person】
    public static Person newMan(int age, String name) {
        return new Person("man", age, name);
    }

    // 4、返回的对象的类可根据参数而变化（保证是子类型即可）
    public static Person noneOf(String sex, int age, String name) {
        if (age < 18) {
            return new Minor(sex, age, name);
        } else {
            return new Adult(sex, age, name);
        }
    }

    public String getSex() {
        return this.sex;
    }

    public int getAge() {
        return this.age;
    }

    public String getName() {
        return this.name;
    }

    @Override
    public String toString() {
        return "{" +
            " sex='" + getSex() + "'" +
            ", age='" + getAge() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }
}

class Minor extends Person {
    Minor (String sex, int age, String name) {
        super(sex, age, name);
    }
}

class Adult extends Person {
    Adult (String sex, int age, String name) {
        super(sex, age, name);
    }
}