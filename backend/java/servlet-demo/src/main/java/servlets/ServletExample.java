package servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;

public class ServletExample extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        // 设置响应头的 Content-Type
        resp.setContentType("text/html;charset=UTF-8");

        // 设置响应体
        PrintWriter writer = resp.getWriter();
        writer.write("<h1>Hello, Get Jay From ServletExample!</h1>");
        // writer.close();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        resp.setContentType("text/html;charset=UTF-8");

        PrintWriter writer = resp.getWriter();
        writer.write("Hello, Post Jay!");
        writer.close();
    }
}
