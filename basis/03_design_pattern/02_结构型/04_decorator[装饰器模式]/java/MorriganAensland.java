/**
 * 用装饰器模式实现游戏角色“莫莉卡·安斯兰”的变身
 * 
 * 分析
 *      游戏角色的原身是一个可爱少女
 *      当她变身时，会变成头顶及背部延伸出蝙蝠状飞翼的女妖
 *      还可以变为穿着漂亮外衣的少女
 * 
 * 设计
 *      抽象组件角色：莫莉卡
 *      具体组件角色：原身
 *      抽象装饰角色：变形
 *      具体装饰角色：女妖
 *      具体装饰角色：少女
 */

public class MorriganAensland {
    public static void main(String[] args) {
        Morrigan m = new Original();
        m.display();

        System.out.println("---------------------------------");

        Morrigan mSu = new Succubus(m);
        mSu.display();

        System.out.println("---------------------------------");

        Morrigan mG = new Girl(m);
        mG.display();
    }
}

// 抽象组件角色：莫莉卡
interface Morrigan {
    // 展示效果
    public void display();
}

// 具体组件角色：原身
class Original implements Morrigan {
    public void display() {
        System.out.println("这是 “原身”");
    }
}

// 抽象装饰角色：变形
class Changer implements Morrigan {
    Morrigan morrigan;

    public Changer(Morrigan morrigan) {
        this.morrigan = morrigan;
    }

    public void display() {
        morrigan.display();
    }
}

// 具体装饰角色：女妖
class Succubus extends Changer {
    public Succubus(Morrigan morrigan) {
        super(morrigan);
    }

    public void display() {
        super.display();
        addSuccubus();
    }

    public void addSuccubus() {
        System.out.println("加上 “女妖”");
    }
}

// 具体装饰角色：少女
class Girl extends Changer {
    public Girl(Morrigan morrigan) {
        super(morrigan);
    }

    public void display() {
        super.display();
        addGirl();
    }

    public void addGirl() {
        System.out.println("加上 “少女”");
    }
}