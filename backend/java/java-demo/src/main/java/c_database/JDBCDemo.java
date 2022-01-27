package c_database;

import javax.xml.crypto.Data;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Arrays;

/**
 * JDBC: Java Database Connectivity（Java 数据库连接）
 *      Java 语言中用来规范客户端程序如何来访问数据库的应用程序接口，提供了诸如查询和更新数据库中数据的方法
 * */
public class JDBCDemo {
    public static final String DB_DRIVER = "com.mysql.cj.jdbc.Driver";

    public static void main(String[] args) throws SQLException {
        /** 1、加载 mysql 驱动类 **/
        try {
            Class.forName(DB_DRIVER); // 使用类加载器显示加载，因为并不会使用驱动中的实现类，而是用 java 中定义的抽象类
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        /**
         * 2、连接数据库
         * 格式: jdbc:mysql://[IP]:[PORT]/[SCHEME]
         * */
        Connection conn; // Connection 用来执行所有数据库操作
        conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/demo", "root", "jay.wang");

        /** 3、SQL 操作 **/
        {
            /** 3.1、CRUD 操作 **/
            {
                /** 3.1.1、写(insert/update/delete)，返回受影响的行数(int) **/
                // Statement writeStatement = conn.createStatement();
                // int lineNum = writeStatement.executeUpdate("INSERT INTO user(age, nickname, phone) VALUES (18, 'Jay02', '1234566777')");
                // writeStatement.close(); // 关闭 SQL 操作
                // System.out.println("SQL insert: 受影响行数为 " + lineNum);
            }
            {
                /** 3.1.2、读(select) **/
                // Statement readStatement = conn.createStatement();
                // ResultSet queryResult = readStatement.executeQuery("SELECT id,nickname,phone,age,create_time FROM user ORDER BY create_time");
                // while (queryResult.next()) {
                //     // 迭代获取 query 结果集，编号一句查询时指定的列名
                //     System.out.print("ID: " + queryResult.getString(1) + "; ");
                //     System.out.print("昵称: " + queryResult.getString(2) + "; ");
                //     System.out.print("电话: " + queryResult.getString(3) + "; ");
                //     System.out.print("年龄: " + queryResult.getString(4) + "; ");
                //     System.out.println("创建时间: " + queryResult.getDate(5));
                //     System.out.println("--------------------------------------------------");
                // }
                // queryResult.close(); // 关闭 query 结果操作
                // readStatement.close();
            }
            {
                /**
                 * 3.1.3、预处理 PreparedStatement
                 *      由驱动实现，即先提供占位(使用 ? 符号)来创建 Statement 对象，后续再填入实际的 sql 部分；
                 *
                 *      性能：预编译语句；可被重复使用，且性能高于 Statement 对象
                 *      安全性：可防止 sql 注入
                 * */
                // PreparedStatement preStatement = conn.prepareStatement("SELECT id,nickname,phone,age,create_time FROM user WHERE nickname LIKE ? OR age >= ? ORDER BY create_time");
                // preStatement.setString(1, "%Jay%");
                // preStatement.setInt(2, 18);
                //
                // ResultSet preQueryResult = preStatement.executeQuery(); // 实例化 ResultSet 对象
                // while (preQueryResult.next()) {
                //     System.out.print("ID: " + preQueryResult.getString(1) + "; ");
                //     System.out.print("昵称: " + preQueryResult.getString(2) + "; ");
                //     System.out.print("电话: " + preQueryResult.getString(3) + "; ");
                //     System.out.print("年龄: " + preQueryResult.getString(4) + "; ");
                //     System.out.println("创建时间: " + preQueryResult.getDate(5));
                //     System.out.println("--------------------------------------------------");
                // }
                //
                // preQueryResult.close();
                // preStatement.close();
            }
            {
                /**
                 * 3.1.4、处理大数据对象，只能使用 PreparedStatement
                 *      存入 mysql
                 *          读写均需使用 Stream
                 *          LONGTEXT类型可存储4G文本数据(CLOB-大文本数据)
                 *          LONGBLOB类型可存储4G二进制数据(BLOB-二进制数据)
                 *      存入硬盘
                 *          mysql 只存储文件路径
                 * */
            }
            {
                /**
                 * 3.1.5、JDBC2.0
                 *      可使用结果集(ResultSet)进行写操作
                 *      支持批处理
                 * */
            }
        }
        {
            /** 3.2、事务处理 **/
            // conn.setAutoCommit(false); // 关闭自动提交
            // Statement txStatement = conn.createStatement();
            //
            // txStatement.addBatch("INSERT INTO user(age, nickname, phone) VALUES (18, 'Jay03', '3234566777')");
            // txStatement.addBatch("INSERT INTO user(age, nickname, phone) VALUES (18, 'Jay04', '4234566777')");
            // txStatement.addBatch("INSERT INTO user(age, nickname, phone) VALUES (18, 'Jay0'5', '5234566777')");
            //
            // try {
            //     int[] temp = txStatement.executeBatch();
            //     System.out.println("写入了 " + temp.length + "条数据。" + Arrays.toString(temp));
            //     conn.commit();
            // } catch (Exception e) {
            //     e.printStackTrace();
            //     conn.rollback(); // 回滚事务（写出错 or commit 出错），即撤销指定 sql 语句的执行结果，解锁
            // }
            //
            // txStatement.close();
        }
        {
            /** 3.3、元数据（metadata）分析 **/
            DatabaseMetaData dbMetaData = conn.getMetaData();
            System.out.println("数据库名称: " + dbMetaData.getDatabaseProductName());
            System.out.println("数据库版本: " + dbMetaData.getDatabaseMajorVersion() + "." + dbMetaData.getDatabaseMinorVersion());

            ResultSet pkRst = dbMetaData.getPrimaryKeys(null, "demo", "user");
            while (pkRst.next()) {
                System.out.println(pkRst.getString(1));
                System.out.println(pkRst.getString(2));
                System.out.println(pkRst.getString(3));
                System.out.println(pkRst.getString(4));
                System.out.println(pkRst.getString(5));
                System.out.println(pkRst.getString(6));
            }
            pkRst.close();
            System.out.println("==================================================");
        }
        {
            boolean isAutoCommit = conn.getAutoCommit();
            boolean isClosed = conn.isClosed();
            System.out.println(isAutoCommit);
            System.out.println(isClosed);
        }

        /** 4、关闭数据库连接 **/
        conn.close();
    }
}
