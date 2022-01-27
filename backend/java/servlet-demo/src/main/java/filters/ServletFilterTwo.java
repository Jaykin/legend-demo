package filters;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

public class ServletFilterTwo implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        PrintWriter writer = response.getWriter();
        writer.write("ServletFilterTwo 对请求进行处理<br/>");
        chain.doFilter(request, response);
        writer.write("ServletFilterTwo 对响应进行处理<br/>");
    }
}
