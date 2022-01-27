package a_grammar.b_oop.reuse;

/**
 * 面向对象 - 继承
 * */

public class Inherit {
    public static void main(String[] args) {
        // 继承
        Chess chess = new Chess();
        System.out.println(chess.getId());
        System.out.println(chess.name);
        // 重写 & 重载
    }
}

// ============================================== 1、继承 ==============================================
// 父类
class Game {
    private int id; // 子类无法直接访问
    protected String name; // 子类可法直接访问


    Game(int id, String name) {
        this.id = id;
        this.name = name;
        System.out.println("Call Game constructor");
    }

    public int getId() {
        return id;
    }

    protected String baseGame() {
        System.out.println("invoke baseGame");
        return "s";
    }
}

class BoardGame extends Game {
    public String getName() {
        return name;
    }

    BoardGame(int i) {
        super(i, "Jay");
        System.out.println("Call BoardGame constructor");
    }
}

class Chess extends BoardGame {
    Chess() {
        super(11);
        System.out.println("Chess constructor" + getName());
    }
}

class Animal {
    String name;

    int id = 0;

    Animal(String myName, int myId) {

    }

    void move() {
        System.out.println("动物可以行动");
    }

    void bark(){
        System.out.println("动物可以叫");
    }
}

// ============================================== 2、重写(override)与重载(overload) ==============================================
class Dog extends Animal {
    Dog(String myName, int myId) {
        super(myName, myId);
    }

    // 重写父类 move 方法
    void move() {
        System.out.println("狗可以跑和走");
    }

    void bark(){
        System.out.println("狗可以吠叫");
    }

    // 重载本类的方法
    void bark(boolean canBark) {
        System.out.println(canBark ? "狗可以吠叫" : "这只狗不会叫");
    }

    // 重载父类的方法
    void sleep(int timePerDay) {
        System.out.println(name + "每天睡" + timePerDay + "次" );
    }
}

// ============================================== 3、抽象类 ==============================================
