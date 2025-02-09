package com.inkstain.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;
import java.util.Enumeration;

@Component
public class RequestLoggingFilter extends GenericFilterBean {

    private static final Logger logger = LoggerFactory.getLogger(RequestLoggingFilter.class);

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // Log request details
        logger.info("Incoming Request: {} {}", httpRequest.getMethod(), httpRequest.getRequestURI());
        logHeaders(httpRequest);

        try {
            chain.doFilter(request, response);
        } finally {
            // Log response details (even for failed requests)
            logger.info("Response Status: {}", httpResponse.getStatus());
        }
    }

    private void logHeaders(HttpServletRequest request) {
        Enumeration<String> headerNames = request.getHeaderNames();
        if (headerNames != null) {
            while (headerNames.hasMoreElements()) {
                String headerName = headerNames.nextElement();
                logger.info("Header: {} = {}", headerName, request.getHeader(headerName));
            }
        }
    }
}
