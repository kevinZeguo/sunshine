package com.beijing.geek.cms.sys.utils;


import com.beijing.geek.cms.sys.spring.ApplicationContextHolder;
import org.apache.log4j.Logger;
import org.apache.velocity.app.VelocityEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.velocity.VelocityEngineFactoryBean;
import org.springframework.ui.velocity.VelocityEngineUtils;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author 马泽国
 */
public class SendMailUtil {
    private static final Logger logger = Logger.getLogger(SendMailUtil.class);
    //private static final String smtphost = "192.168.1.70";
    private static final String smtpHost = "smtp.126.com";
    private static final String from = "xinzhong85@126.com";
    private static final String fromUserPassword = "mzg_200491";
    private static final String messageType = "text/html;charset=gb2312";
    private static Map<String, String> hostMap = new HashMap<String, String>();
    @Autowired
    private VelocityEngine velocityEngine;

//
//    static {
//        factoryBean = new VelocityEngineFactoryBean();
//        factoryBean.setResourceLoaderPath("/WEB-INF/mail/");
//        Properties pro = new Properties();
//        pro.setProperty("default.contentType", "text/html; charset=utf-8");
//        pro.setProperty("output.encoding", "utf-8");
//        pro.setProperty("input.encoding", "utf-8");
//        pro.setProperty("dateToolAttribute", "dateTool");
//        pro.setProperty("resource.loader", "class");
//        pro.setProperty("class.resource.loader.class", "org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader");
//        factoryBean.setVelocityProperties(pro);
//    }

    public static void sendMessage(String to, String subject, String messageText, String cc) throws MessagingException {
        logger.debug("===========================================================================================");
        logger.debug(messageText);
        // 第一步：配置javax.mail.Session对象
        logger.info("为" + smtpHost + "配置mail session对象");
        Properties props = new Properties();
        props.put("mail.smtp.host", smtpHost);
        props.put("mail.smtp.starttls.enable", "true");//使用 STARTTLS安全连接
        //props.put("mail.smtp.port", "25");             //google使用465或587端口
        props.put("mail.smtp.auth", "true");        // 使用验证
        //props.put("mail.debug", "true");
        Session mailSession = Session.getInstance(props, new MyAuthenticator(from, fromUserPassword));

        // 第二步：编写消息
        logger.info("编写消息from——to:" + from + "——" + to);

        InternetAddress fromAddress = new InternetAddress(from);
        InternetAddress toAddress = new InternetAddress(to);

        MimeMessage message = new MimeMessage(mailSession);

        message.setFrom(fromAddress);
        message.addRecipient(MimeMessage.RecipientType.TO, toAddress);
        if (StringUtil.isNotEmpty(cc)) {
            message.addRecipient(MimeMessage.RecipientType.CC, new InternetAddress(cc));
        }

        message.setSentDate(Calendar.getInstance().getTime());
        message.setSubject(subject);
        message.setContent(messageText, messageType);

        // 第三步：发送消息
        Transport transport = mailSession.getTransport("smtp");
        transport.connect(smtpHost, from, fromUserPassword);
        transport.send(message, message.getRecipients(MimeMessage.RecipientType.TO));
        if (StringUtil.isNotEmpty(cc)) {
            transport.send(message, message.getRecipients(MimeMessage.RecipientType.CC));
        }
        logger.info("message yes");
    }

    public static void main(String[] args) {
        try {
            SendMailUtil.sendMessage("xinzhong85@126.com", "你好",
                    "我想测试一下",
                    "xinzhong85@sina.com");
        } catch (MessagingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}

class MyAuthenticator extends Authenticator {
    String userName = "";
    String password = "";

    public MyAuthenticator() {
    }

    public MyAuthenticator(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }

    protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(userName, password);
    }
}